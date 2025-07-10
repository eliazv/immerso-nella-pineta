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
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "checkin" | "checkout" | "maintenance" | "payment";
  priority: "high" | "medium" | "low";
  dueDate: string;
  apartment?: string;
  guest?: string;
}

interface UpcomingTasksProps {
  tasks?: Task[];
  title?: string;
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({
  tasks = [],
  title = "Prossime Attività",
}) => {
  const getTaskIcon = (type: Task["type"]) => {
    switch (type) {
      case "checkin":
        return <User className="h-4 w-4 text-menta" />;
      case "checkout":
        return <User className="h-4 w-4 text-warning" />;
      case "maintenance":
        return <Home className="h-4 w-4 text-petrolio" />;
      case "payment":
        return <CheckCircle2 className="h-4 w-4 text-menta" />;
      default:
        return <Calendar className="h-4 w-4 text-ardesia" />;
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
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
          <Clock className="h-5 w-5 text-petrolio" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna attività programmata</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutro/30 transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-petrolio/10 flex-shrink-0">
                  {getTaskIcon(task.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-ardesia text-sm leading-5">
                      {task.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getPriorityColor(
                        task.priority
                      )} flex-shrink-0`}
                    >
                      {task.priority === "high"
                        ? "Alta"
                        : task.priority === "medium"
                        ? "Media"
                        : "Bassa"}
                    </Badge>
                  </div>
                  <p className="text-xs text-ardesia/60 mb-2">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-ardesia/50">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                    {task.apartment && (
                      <span className="flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        {task.apartment}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
