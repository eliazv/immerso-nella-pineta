import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Bell, Home, Calendar } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  subtitle?: string;
  avatarUrl?: string;
  onNewBookingClick?: () => void;
  onNewApartmentClick?: () => void;
  onNotificationClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Property Manager",
  subtitle = "Gestione Alloggi",
  avatarUrl,
  onNewBookingClick,
  onNewApartmentClick,
  onNotificationClick,
}) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-petrolio text-white font-semibold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-ardesia">{name}</h2>
          <p className="text-sm text-ardesia/60">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
          </DropdownMenuContent>
        </DropdownMenu>

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
  );
};

export default ProfileHeader;
