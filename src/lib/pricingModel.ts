export type PlatformType = "diretto" | "airbnb" | "booking";
export type ApartmentPricingType = "n3" | "n8";
export type MonthHalf = "H1" | "H2";

export interface HalfMonthPricing {
  month: number;
  half: MonthHalf;
  airbnb: number;
  booking: number;
  diretto: number;
}

const withDirect = (
  entries: Array<Omit<HalfMonthPricing, "diretto">>,
): HalfMonthPricing[] => {
  return entries.map((entry) => ({
    ...entry,
    // Diretto mediamente sotto Airbnb per mantenere vantaggio canale diretto.
    diretto: Math.round(entry.airbnb * 0.9),
  }));
};

const n3Pricing = withDirect([
  { month: 1, half: "H1", airbnb: 55, booking: 62 },
  { month: 1, half: "H2", airbnb: 55, booking: 62 },
  { month: 2, half: "H1", airbnb: 55, booking: 62 },
  { month: 2, half: "H2", airbnb: 55, booking: 62 },
  { month: 3, half: "H1", airbnb: 55, booking: 62 },
  { month: 3, half: "H2", airbnb: 55, booking: 62 },
  { month: 4, half: "H1", airbnb: 60, booking: 67 },
  { month: 4, half: "H2", airbnb: 80, booking: 90 },
  { month: 5, half: "H1", airbnb: 65, booking: 73 },
  { month: 5, half: "H2", airbnb: 75, booking: 84 },
  { month: 6, half: "H1", airbnb: 80, booking: 90 },
  { month: 6, half: "H2", airbnb: 90, booking: 101 },
  { month: 7, half: "H1", airbnb: 115, booking: 129 },
  { month: 7, half: "H2", airbnb: 125, booking: 140 },
  { month: 8, half: "H1", airbnb: 130, booking: 146 },
  { month: 8, half: "H2", airbnb: 120, booking: 134 },
  { month: 9, half: "H1", airbnb: 90, booking: 101 },
  { month: 9, half: "H2", airbnb: 80, booking: 90 },
  { month: 10, half: "H1", airbnb: 70, booking: 79 },
  { month: 10, half: "H2", airbnb: 75, booking: 84 },
  { month: 11, half: "H1", airbnb: 55, booking: 62 },
  { month: 11, half: "H2", airbnb: 55, booking: 62 },
  { month: 12, half: "H1", airbnb: 55, booking: 62 },
  { month: 12, half: "H2", airbnb: 70, booking: 79 },
]);

const n8Pricing = withDirect([
  { month: 1, half: "H1", airbnb: 65, booking: 73 },
  { month: 1, half: "H2", airbnb: 65, booking: 73 },
  { month: 2, half: "H1", airbnb: 65, booking: 73 },
  { month: 2, half: "H2", airbnb: 65, booking: 73 },
  { month: 3, half: "H1", airbnb: 70, booking: 78 },
  { month: 3, half: "H2", airbnb: 70, booking: 78 },
  { month: 4, half: "H1", airbnb: 85, booking: 95 },
  { month: 4, half: "H2", airbnb: 105, booking: 118 },
  { month: 5, half: "H1", airbnb: 95, booking: 106 },
  { month: 5, half: "H2", airbnb: 105, booking: 118 },
  { month: 6, half: "H1", airbnb: 115, booking: 129 },
  { month: 6, half: "H2", airbnb: 130, booking: 146 },
  { month: 7, half: "H1", airbnb: 170, booking: 190 },
  { month: 7, half: "H2", airbnb: 180, booking: 202 },
  { month: 8, half: "H1", airbnb: 190, booking: 213 },
  { month: 8, half: "H2", airbnb: 185, booking: 207 },
  { month: 9, half: "H1", airbnb: 125, booking: 140 },
  { month: 9, half: "H2", airbnb: 115, booking: 129 },
  { month: 10, half: "H1", airbnb: 95, booking: 106 },
  { month: 10, half: "H2", airbnb: 110, booking: 123 },
  { month: 11, half: "H1", airbnb: 75, booking: 84 },
  { month: 11, half: "H2", airbnb: 75, booking: 84 },
  { month: 12, half: "H1", airbnb: 80, booking: 90 },
  { month: 12, half: "H2", airbnb: 95, booking: 106 },
]);

export const monthLabels = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic",
];

export const getPricingTable = (
  apartment: ApartmentPricingType,
): HalfMonthPricing[] => {
  return apartment === "n3" ? n3Pricing : n8Pricing;
};

export const getRateForPeriod = (
  apartment: ApartmentPricingType,
  month: number,
  half: MonthHalf,
  platform: PlatformType,
): number => {
  const table = getPricingTable(apartment);
  const row = table.find(
    (entry) => entry.month === month && entry.half === half,
  );

  if (!row) return 0;
  return row[platform];
};

export const getHalfFromDay = (dayOfMonth: number): MonthHalf => {
  return dayOfMonth <= 15 ? "H1" : "H2";
};

export const getRateForDate = (
  apartment: ApartmentPricingType,
  date: Date,
  platform: PlatformType,
): number => {
  const month = date.getMonth() + 1;
  const half = getHalfFromDay(date.getDate());
  return getRateForPeriod(apartment, month, half, platform);
};

export const isTouristTaxSeason = (month: number): boolean => {
  return month >= 5 && month <= 9;
};
