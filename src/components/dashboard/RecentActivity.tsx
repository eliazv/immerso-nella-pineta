import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ChevronRight } from "lucide-react";

interface ActivityItem {
  text: string;
  timestamp: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  title?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [],
  title = "Attività Recenti",
}) => {
  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-ardesia">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna attività recente</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-neutro/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1">
                  {activity.icon && (
                    <div className="p-2 rounded-lg bg-petrolio/10">
                      <activity.icon className="h-4 w-4 text-petrolio" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ardesia leading-5">
                      {activity.text}
                    </p>
                    <p className="text-xs text-ardesia/60 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-ardesia/40 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
