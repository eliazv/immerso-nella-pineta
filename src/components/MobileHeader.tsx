import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Bell,
  Calendar,
  Home as HomeIcon,
  Download,
  Upload,
  Database,
  ArrowLeft,
} from "lucide-react";

interface MobileHeaderProps {
  pageTitle: string;
  onNewBookingClick?: () => void;
  onNewApartmentClick?: () => void;
  onICalImportClick?: () => void;
  onNotificationClick?: () => void;
  onExportDataClick?: () => void;
  onImportDataClick?: () => void;
  onBackClick?: () => void;
  showCreateActions?: boolean;
  showNotifications?: boolean;
  showBackButton?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  pageTitle,
  onNewBookingClick,
  onNewApartmentClick,
  onICalImportClick,
  onNotificationClick,
  onExportDataClick,
  onImportDataClick,
  onBackClick,
  showCreateActions = true,
  showNotifications = true,
  showBackButton = false,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Logo e Nome */}
      <div className="flex items-center gap-3">
        <img src="/rentpilot.svg" alt="RentPilot" className="h-10 w-10 mr-2" />
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-lg text-petrolio">RentPilot</span>
          <span className="font-bold text-lg text-ardesia">{pageTitle}</span>
        </div>
      </div>

      {/* Pulsanti Azione */}
      <div className="flex items-center gap-2">
        {showCreateActions && (
          <div className="bg-white rounded-full shadow-sm border border-gray-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-petrolio/10 transition-colors"
                >
                  <Plus className="h-4 w-4 text-ardesia hover:text-petrolio" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {onNewBookingClick && (
                  <DropdownMenuItem onClick={onNewBookingClick}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Nuova Prenotazione
                  </DropdownMenuItem>
                )}
                {onNewApartmentClick && (
                  <DropdownMenuItem onClick={onNewApartmentClick}>
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Nuovo Alloggio
                  </DropdownMenuItem>
                )}
                {onICalImportClick && (
                  <DropdownMenuItem onClick={onICalImportClick}>
                    <Download className="h-4 w-4 mr-2" />
                    Importa da iCal
                  </DropdownMenuItem>
                )}
                {onExportDataClick && (
                  <DropdownMenuItem onClick={onExportDataClick}>
                    <Database className="h-4 w-4 mr-2" />
                    Esporta Dati
                  </DropdownMenuItem>
                )}
                {onImportDataClick && (
                  <DropdownMenuItem onClick={onImportDataClick}>
                    <Upload className="h-4 w-4 mr-2" />
                    Importa Dati
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {showNotifications && (
          <div className="bg-white rounded-full shadow-sm border border-gray-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-petrolio/10 transition-colors"
                  onClick={onNotificationClick}
                >
                  <Bell className="h-4 w-4 text-ardesia hover:text-petrolio" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <span className="text-sm text-muted-foreground">
                    Nessuna notifica
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {showBackButton && onBackClick && (
          <div className="bg-white rounded-full shadow-sm border border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-petrolio/10 transition-colors"
              onClick={onBackClick}
            >
              <ArrowLeft className="h-4 w-4 text-ardesia hover:text-petrolio" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
