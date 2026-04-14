import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BadgeEuro,
  Calendar as CalendarIcon,
  Calculator,
  Handshake,
  Trees,
  Table2,
} from "lucide-react";
import {
  ApartmentPricingType,
  PlatformType,
  getPricingTable,
  getRateForDate,
  isTouristTaxSeason,
  monthLabels,
} from "@/lib/pricingModel";
import { CalendarType } from "@/types/calendar";
import { DateRange } from "react-day-picker";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { it } from "date-fns/locale";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";

interface PricingCardsProps {
  selectedCalendar: CalendarType;
}

const PLATFORM_OPTIONS: Array<{ value: PlatformType; label: string }> = [
  { value: "diretto", label: "Diretto" },
  { value: "airbnb", label: "Airbnb" },
  { value: "booking", label: "Booking" },
];

const apartmentLabel = (apartment: ApartmentPricingType) =>
  apartment === "n3" ? "N3 (4 posti)" : "N8 (6 posti)";

const fromCalendarType = (calendarType: CalendarType): ApartmentPricingType => {
  if (calendarType === "terziario") return "n8";
  return "n3";
};

const getPriceLevelClasses = (value: number): string => {
  if (value <= 70)
    return "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200";
  if (value <= 100)
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
  if (value <= 140)
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
  return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200";
};

const formatHalfRange = (firstHalf: number, secondHalf: number): string => {
  if (firstHalf === secondHalf) {
    return `${firstHalf} EUR`;
  }
  return `${firstHalf}-${secondHalf} EUR`;
};

const getPlatformRates = (platform: PlatformType) => {
  if (platform === "booking") {
    return { otaTaxRate: 0.2, cedolareRate: 0.21 };
  }
  if (platform === "airbnb") {
    return { otaTaxRate: 0.04, cedolareRate: 0.18 };
  }
  return { otaTaxRate: 0, cedolareRate: 0.21 };
};

const euro = (value: number) => `${value.toLocaleString("it-IT")} EUR`;

const ChannelRow: React.FC<{
  platform: PlatformType;
  value: number;
}> = ({ platform, value }) => {
  const icon =
    platform === "diretto" ? (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
        <Handshake className="h-3 w-3 text-emerald-700 dark:text-emerald-300" />
      </span>
    ) : (
      getOtaLogo(platform)
    );

  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <span
        className="inline-flex items-center gap-1.5"
        title={platform}
        aria-label={platform}
      >
        {icon}
      </span>
      <span
        className={`px-2 py-0.5 rounded-md font-bold tabular-nums ${getPriceLevelClasses(value)}`}
      >
        {value} EUR
      </span>
    </div>
  );
};

const PricingCards: React.FC<PricingCardsProps> = ({ selectedCalendar }) => {
  const apartment = useMemo(
    () => fromCalendarType(selectedCalendar),
    [selectedCalendar],
  );

  const [quotePlatform, setQuotePlatform] = useState<PlatformType>("diretto");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [quoteAdults, setQuoteAdults] = useState<number>(2);

  const tableRows = useMemo(() => getPricingTable(apartment), [apartment]);

  const monthlyRows = useMemo(() => {
    return Array.from({ length: 12 }, (_, idx) => {
      const month = idx + 1;
      const h1 = tableRows.find((r) => r.month === month && r.half === "H1");
      const h2 = tableRows.find((r) => r.month === month && r.half === "H2");
      return {
        month,
        airbnb: h1 && h2 ? formatHalfRange(h1.airbnb, h2.airbnb) : "-",
        booking: h1 && h2 ? formatHalfRange(h1.booking, h2.booking) : "-",
        diretto: h1 && h2 ? formatHalfRange(h1.diretto, h2.diretto) : "-",
        avgAirbnb: h1 && h2 ? Math.round((h1.airbnb + h2.airbnb) / 2) : 0,
        avgBooking: h1 && h2 ? Math.round((h1.booking + h2.booking) / 2) : 0,
        avgDiretto: h1 && h2 ? Math.round((h1.diretto + h2.diretto) / 2) : 0,
      };
    });
  }, [tableRows]);

  const quoteData = useMemo(() => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    const nights =
      from && to ? Math.max(0, differenceInCalendarDays(to, from)) : 0;
    const adults = Math.max(0, quoteAdults || 0);

    let nightsTotal = 0;
    if (from && to && nights > 0) {
      for (let i = 0; i < nights; i += 1) {
        const nightDate = addDays(from, i);
        nightsTotal += getRateForDate(apartment, nightDate, quotePlatform);
      }
    }

    const avgNightlyRate = nights > 0 ? nightsTotal / nights : 0;
    const cleaningFee = 90;

    const seasonalNights =
      from && to && nights > 0
        ? Array.from({ length: nights }, (_, i) => addDays(from, i)).reduce(
            (acc, day) => {
              const month = day.getMonth() + 1;
              return acc + (isTouristTaxSeason(month) ? 1 : 0);
            },
            0,
          )
        : 0;

    const tourismTax = Math.min(seasonalNights, 7) * adults * 1;
    const total = nightsTotal + cleaningFee + tourismTax;

    const { otaTaxRate, cedolareRate } = getPlatformRates(quotePlatform);
    const otaTax = total * otaTaxRate;
    const cedolareSecca = total * cedolareRate;
    const hostNetEstimate = total - tourismTax - otaTax - cedolareSecca;

    return {
      avgNightlyRate,
      nights,
      adults,
      cleaningFee,
      tourismTax,
      otaTax,
      cedolareSecca,
      nightsTotal,
      total,
      hostNetEstimate,
    };
  }, [apartment, dateRange, quotePlatform, quoteAdults]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:items-start gap-8">
      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden self-start">
        <CardHeader className="pb-4 pt-6 px-6 md:pt-8 md:px-8">
          <div className="flex items-center gap-3">
            <Table2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-black">
              Listino meta mese 2026
            </CardTitle>
          </div>
          <CardDescription className="font-medium">
            Prezzi consigliati per il periodo 1-15 e 16-fine mese.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-6 md:px-8 md:pb-8 space-y-4">
          <div className="overflow-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/70">
                <tr>
                  <th className="text-left p-2.5 font-semibold">Mese</th>
                  <th className="text-left p-2.5 font-semibold">Prezzo</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRows.map((row) => (
                  <tr
                    key={row.month}
                    className="border-t border-slate-100 dark:border-slate-800 align-top"
                  >
                    <td className="p-2.5 font-semibold whitespace-nowrap">
                      {monthLabels[row.month - 1]}
                    </td>
                    <td className="p-2.5 min-w-[235px]">
                      <div className="space-y-1">
                        <ChannelRow platform="airbnb" value={row.avgAirbnb} />
                        <div className="pl-7 -mt-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-200">
                          {row.airbnb}
                        </div>

                        <ChannelRow platform="booking" value={row.avgBooking} />
                        <div className="pl-7 -mt-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-200">
                          {row.booking}
                        </div>

                        <ChannelRow platform="diretto" value={row.avgDiretto} />
                        <div className="pl-7 -mt-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-200">
                          {row.diretto}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Celle colorate: blu prezzi bassi, verde medi, ambra medi-alti, rosso
            alta stagione.
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden self-start">
        <CardHeader className="pb-4 pt-6 px-6 md:pt-8 md:px-8">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-black">
              Preventivo rapido
            </CardTitle>
          </div>
          <CardDescription className="font-medium">
            Calcolo stimato per durata soggiorno e piattaforma.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-6 md:px-8 md:pb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground">
                Piattaforma
              </Label>
              <Select
                value={quotePlatform}
                onValueChange={(value) =>
                  setQuotePlatform(value as PlatformType)
                }
              >
                <SelectTrigger className="h-9 mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORM_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label className="text-xs font-semibold text-muted-foreground">
                Periodo soggiorno
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-10 mt-1.5"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from
                      ? dateRange.to
                        ? `${format(dateRange.from, "dd MMM yyyy", { locale: it })} - ${format(dateRange.to, "dd MMM yyyy", { locale: it })}`
                        : format(dateRange.from, "dd MMM yyyy", { locale: it })
                      : "Seleziona da / a"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={it}
                    disabled={{ before: new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-xs font-semibold text-muted-foreground">
                Adulti
              </Label>
              <Input
                type="number"
                min={0}
                value={quoteAdults}
                onChange={(e) =>
                  setQuoteAdults(parseInt(e.target.value, 10) || 0)
                }
                className="h-9 mt-1.5"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/60 dark:bg-slate-800/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tariffa media notte</span>
              <span className="font-semibold">
                {euro(Math.round(quoteData.avgNightlyRate))}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-muted-foreground">
                Notti ({quoteData.nights})
              </span>
              <span className="font-semibold">
                {euro(quoteData.nightsTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-muted-foreground">Pulizia</span>
              <span className="font-semibold">
                {euro(quoteData.cleaningFee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-muted-foreground">
                Imposta soggiorno stimata
              </span>
              <span className="font-semibold">
                {euro(quoteData.tourismTax)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-muted-foreground">OTA tax stimata</span>
              <span className="font-semibold">
                {euro(Math.round(quoteData.otaTax))}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-muted-foreground">
                Cedolare secca stimata
              </span>
              <span className="font-semibold">
                {euro(Math.round(quoteData.cedolareSecca))}
              </span>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 mt-3 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <BadgeEuro className="h-4 w-4 text-primary" />
                Totale cliente stimato
              </div>
              <div className="text-xl font-black text-primary">
                {euro(quoteData.total)}
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 mt-3 pt-3 flex items-center justify-between">
              <div className="font-bold text-sm inline-flex items-center gap-1.5">
                <Trees className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Netto host stimato
              </div>
              <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {euro(Math.round(quoteData.hostNetEstimate))}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Tariffe notte calcolate dinamicamente su ogni data del range in base
            al listino semimensile. Stima inclusiva di: pulizia (90 EUR),
            imposta soggiorno (1 EUR/adulto/notte in maggio-settembre, max 7
            notti), OTA tax (Booking 20%, Airbnb 4%, Diretto 0%), cedolare secca
            (Booking 21%, Airbnb 18%, Diretto 21%).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCards;
