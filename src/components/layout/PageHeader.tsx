import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageHeaderAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: PageHeaderAction[];
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions = [],
  children,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-ardesia">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {children}
        
        {actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Azioni
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map((action, index) => (
                <DropdownMenuItem key={index} onClick={action.onClick}>
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
