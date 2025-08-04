import React from "react";
import { Plus, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarType } from "@/types/calendar";
import AddBookingModal from "./AddBookingModal";
import { ICalImportModal } from "./ICalImportModal";

interface NewBookingDropdownProps {
  calendarType: CalendarType;
  onAdd: () => void;
  isMobile?: boolean;
}

export const NewBookingDropdown: React.FC<NewBookingDropdownProps> = ({
  calendarType,
  onAdd,
  isMobile = false,
}) => {
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            {!isMobile && <span>Nuovo</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <AddBookingModal calendarType={calendarType} onAdd={onAdd} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsImportModalOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Importa da iCal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Import Modal */}
      <ICalImportModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
        calendarType={calendarType}
        onImportComplete={() => {
          onAdd();
          setIsImportModalOpen(false);
        }}
      />
    </>
  );
};
