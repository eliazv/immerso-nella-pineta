import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, DoorOpen, Wallet, Wrench } from "lucide-react";

interface SummaryCardData {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  additionalInfo?: string;
}

interface PropertySummaryCardsProps {
  data?: {
    properties: number;
    occupied: { current: number; total: number };
    rentCollected: { current: number; total: number };
    maintenanceRequests: number;
  };
}

const PropertySummaryCards: React.FC<PropertySummaryCardsProps> = ({
  data = {
    properties: 2,
    occupied: { current: 140, total: 150 },
    rentCollected: { current: 120, total: 140 },
    maintenanceRequests: 5,
  },
}) => {
  const summaryData: SummaryCardData[] = [
    {
      label: "Alloggi",
      value: data.properties.toString().padStart(2, "0"),
      icon: Building,
    },
    {
      label: "Occupati",
      value: `${data.occupied.current}/${data.occupied.total}`,
      icon: DoorOpen,
    },
    {
      label: "Incassi",
      value: `${data.rentCollected.current}/${data.rentCollected.total}`,
      icon: Wallet,
    },
    {
      label: "Manutenzioni",
      value: data.maintenanceRequests.toString().padStart(2, "0"),
      icon: Wrench,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {summaryData.map((item, index) => (
        <Card
          key={index}
          className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl"
        >
          <CardContent className="p-6 flex flex-col items-start justify-between h-28">
            <div className="flex items-center justify-between w-full mb-3">
              <div className="p-2.5 rounded-xl bg-petrolio/10">
                <item.icon className="h-5 w-5 text-petrolio" />
              </div>
              {item.additionalInfo && (
                <span className="text-xs text-ardesia/50 text-right">
                  {item.additionalInfo}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="text-2xl font-bold text-ardesia mb-1 leading-none">
                {item.value}
              </div>
              <div className="text-sm text-ardesia/60 font-medium">
                {item.label}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertySummaryCards;
