import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Bell, Home, Calendar, Download } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  subtitle?: string;
  avatarUrl?: string;
  onNewBookingClick?: () => void;
  onNewApartmentClick?: () => void;
  onICalImportClick?: () => void;
  onNotificationClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Property Manager",
  subtitle = "Gestione Alloggi",
  avatarUrl,
  onNewBookingClick,
  onNewApartmentClick,
  onICalImportClick,
  onNotificationClick,
}) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-petrolio/10 flex items-center justify-center">
          <img src="/rentpilot.svg" alt="RentPilot" className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ardesia">{name}</h2>
          <p className="text-sm text-ardesia/60">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-white rounded-full shadow-sm border border-gray-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-petrolio/10 transition-colors"
              >
                <Plus className="h-5 w-5 text-ardesia hover:text-petrolio" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onNewBookingClick}>
                <Calendar className="h-4 w-4 mr-2" />
                Nuova Prenotazione
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onNewApartmentClick}>
                <Home className="h-4 w-4 mr-2" />
                Nuovo Alloggio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onICalImportClick}>
                <Download className="h-4 w-4 mr-2" />
                Importa da iCal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-white rounded-full shadow-sm border border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-petrolio/10 transition-colors"
            onClick={onNotificationClick}
          >
            <Bell className="h-5 w-5 text-ardesia hover:text-petrolio" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
