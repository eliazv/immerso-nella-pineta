import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  User,
  Home,
  Activity,
  ChevronRight,
  LogIn,
  LogOut
} from "lucide-react";
import { Booking } from "@/types/calendar";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { it } from "date-fns/locale";

interface ActivityItem {
  id: string;
  type: "checkin" | "checkout" | "booking" | "maintenance";
  title: string;
  description: string;
  timestamp: string;
  apartment?: string;
  guest?: string;
  priority?: "high" | "medium" | "low";
}

interface ActivitiesProps {
  upcomingBookings?: Booking[];
  title?: string;
}

const Activities: React.FC<ActivitiesProps> = ({
  upcomingBookings = [],
  title = "Attività"
}) => {
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    // Se la data è in formato DD/MM/YYYY
    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    // Se la data è in formato YYYY-MM-DD
    if (dateString.includes("-")) {
      return parseISO(dateString);
    }
    
    return null;
  };

  const formatDate = (dateString: string): string => {
    const date = parseDate(dateString);
    if (!date) return dateString;

    if (isToday(date)) return "Oggi";
    if (isTomorrow(date)) return "Domani";

    return format(date, "dd MMM", { locale: it });
  };

  // Genera attività dalle prenotazioni
  const generateActivitiesFromBookings = (): ActivityItem[] => {
    const activities: ActivityItem[] = [];
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    upcomingBookings.forEach((booking) => {
      const checkInDate = parseDate(booking.CheckIn);
      const checkOutDate = parseDate(booking.CheckOut);

      // Check-in activity
      if (checkInDate && checkInDate >= today && checkInDate <= nextWeek) {
        activities.push({
          id: `checkin-${booking.id}`,
          type: "checkin",
          title: `Check-in ${booking.Nome}`,
          description: `Arrivo previsto per ${formatDate(booking.CheckIn)}`,
          timestamp: booking.CheckIn,
          apartment: booking.apartment,
          guest: booking.Nome,
          priority: isToday(checkInDate) ? "high" : "medium"
        });
      }

      // Check-out activity
      if (checkOutDate && checkOutDate >= today && checkOutDate <= nextWeek) {
        activities.push({
          id: `checkout-${booking.id}`,
          type: "checkout", 
          title: `Check-out ${booking.Nome}`,
          description: `Partenza prevista per ${formatDate(booking.CheckOut)}`,
          timestamp: booking.CheckOut,
          apartment: booking.apartment,
          guest: booking.Nome,
          priority: isToday(checkOutDate) ? "high" : "medium"
        });
      }
    });

    // Ordina per data
    return activities.sort((a, b) => {
      const dateA = parseDate(a.timestamp) || new Date();
      const dateB = parseDate(b.timestamp) || new Date();
      return dateA.getTime() - dateB.getTime();
    });
  };

  const activities = generateActivitiesFromBookings();
  const upcomingActivities = activities.filter(activity => {
    const date = parseDate(activity.timestamp);
    return date && date >= new Date();
  });

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "checkin":
        return <LogIn className="h-4 w-4 text-menta" />;
      case "checkout":
        return <LogOut className="h-4 w-4 text-warning" />;
      case "booking":
        return <Calendar className="h-4 w-4 text-petrolio" />;
      case "maintenance":
        return <Home className="h-4 w-4 text-petrolio" />;
      default:
        return <Activity className="h-4 w-4 text-ardesia" />;
    }
  };

  const getPriorityColor = (priority?: ActivityItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-warning/10 text-warning border-warning/20";
      case "medium":
        return "bg-petrolio/10 text-petrolio border-petrolio/20";
      case "low":
        return "bg-menta/10 text-menta border-menta/20";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-ardesia flex items-center gap-2">
          <Activity className="h-5 w-5 text-petrolio" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {upcomingActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna attività programmata</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingActivities.slice(0, 6).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutro/30 transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-petrolio/10 flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-ardesia text-sm leading-5">
                      {activity.title}
                    </h4>
                    {activity.priority && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(activity.priority)} flex-shrink-0`}
                      >
                        {activity.priority === "high" ? "Alta" : activity.priority === "medium" ? "Media" : "Bassa"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-ardesia/60 mb-2">{activity.description}</p>
                  <div className="flex items-center gap-3 text-xs text-ardesia/50">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(activity.timestamp)}
                    </span>
                    {activity.apartment && (
                      <span className="flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        {activity.apartment}
                      </span>
                    )}
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

export default Activities;
