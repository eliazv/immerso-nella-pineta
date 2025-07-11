import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal } from "lucide-react";

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

interface ActionButtonsProps {
  primaryActions?: ActionButton[];
  secondaryActions?: ActionButton[];
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  primaryActions = [],
  secondaryActions = [],
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Primary Actions - shown as individual buttons */}
      {primaryActions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || "default"}
          size={action.size || "sm"}
          onClick={action.onClick}
          className="flex items-center gap-2"
        >
          {action.icon}
          <span className="hidden sm:inline">{action.label}</span>
        </Button>
      ))}

      {/* Secondary Actions - shown in dropdown */}
      {secondaryActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Altre azioni</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {secondaryActions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={action.onClick}>
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ActionButtons;
