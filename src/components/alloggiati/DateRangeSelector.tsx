import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import FieldError from "@/components/ui/field-error";

interface DateRangeSelectorProps {
  dataArrivo: string;
  dataPartenza: string;
  giorniPermanenza: number;
  onDateChange: (field: "dataArrivo" | "dataPartenza", value: string) => void;
  getFieldError?: (field: string) => string | undefined;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dataArrivo,
  dataPartenza,
  giorniPermanenza,
  onDateChange,
  getFieldError,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Dettagli Soggiorno
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="dataArrivo">Data di Arrivo *</Label>
            <Input
              id="dataArrivo"
              type="date"
              value={dataArrivo}
              onChange={(e) => onDateChange("dataArrivo", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
            {getFieldError && (
              <FieldError error={getFieldError("dataArrivo")} />
            )}
          </div>
          <div>
            <Label htmlFor="dataPartenza">Data di Partenza *</Label>
            <Input
              id="dataPartenza"
              type="date"
              value={dataPartenza}
              onChange={(e) => onDateChange("dataPartenza", e.target.value)}
              min={
                dataArrivo
                  ? new Date(
                      Math.max(
                        new Date(dataArrivo).getTime() + 24 * 60 * 60 * 1000,
                        new Date().getTime()
                      )
                    )
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              required
            />
            {getFieldError && (
              <FieldError error={getFieldError("dataPartenza")} />
            )}
          </div>
          <div>
            <Label htmlFor="giorniPermanenza">Giorni</Label>
            <Input
              id="giorniPermanenza"
              type="number"
              value={giorniPermanenza}
              disabled
              className="bg-gray-50"
            />
            {getFieldError && (
              <FieldError error={getFieldError("giorniPermanenza")} />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Questi dettagli si applicheranno a tutti gli ospiti del gruppo.
        </p>
      </CardContent>
    </Card>
  );
};

export default DateRangeSelector;
