import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  subtitle?: string;
  avatarUrl?: string;
  onAddClick?: () => void;
  onNotificationClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Property Manager",
  subtitle = "Gestione Alloggi",
  avatarUrl,
  onAddClick,
  onNotificationClick,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
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
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-neutro hover:bg-neutro-dark"
          onClick={onAddClick}
        >
          <Plus className="h-5 w-5 text-ardesia" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-neutro hover:bg-neutro-dark"
          onClick={onNotificationClick}
        >
          <Bell className="h-5 w-5 text-ardesia" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
