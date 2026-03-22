import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2, Calendar, Moon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Booking, CalendarType } from "@/types/calendar";
import { fetchBookings } from "@/services/bookingService";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
import BookingModal from "@/components/calendar/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";

const apartmentShortName = (apartment?: string) => {
  switch (apartment) {
    case "principale": return "N° 3";
    case "secondario": return "N° 4";
    case "terziario": return "N° 8";
    default: return "";
  }
};

const calendarTypeFromApartment = (apartment?: string): CalendarType => {
  switch (apartment) {
    case "secondario": return "secondario";
    case "terziario": return "terziario";
    default: return "principale";
  }
};

interface SearchResultItemProps {
  booking: Booking;
  onClick: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ booking, onClick }) => (
  <button
    className="w-full text-left border rounded-2xl p-3 bg-white dark:bg-slate-900 hover:shadow-md hover:border-primary/30 cursor-pointer transition-all active:scale-[0.99] flex items-center gap-3"
    onClick={onClick}
  >
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
      {getOtaLogo(booking.OTA)}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-2">
        <span className="font-black text-slate-800 dark:text-white truncate text-sm">
          {booking.Nome}
        </span>
        <span className="text-sm font-black text-primary shrink-0">
          {booking.Totale}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-0.5">
        {booking.apartment && (
          <span className="text-[10px] font-black uppercase tracking-widest text-primary px-1.5 py-0.5 bg-primary/5 rounded-full border border-primary/20">
            {apartmentShortName(booking.apartment)}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          {booking.CheckIn}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Moon className="w-3 h-3" />
          {booking.Notti}
        </span>
      </div>
    </div>
  </button>
);

interface BookingSearchInnerProps {
  onSelectBooking: (booking: Booking) => void;
}

const BookingSearchInner: React.FC<BookingSearchInnerProps> = ({ onSelectBooking }) => {
  const [query, setQuery] = useState("");
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetchBookings("all")
      .then(({ bookings }) => setAllBookings(bookings))
      .finally(() => setLoading(false));
  }, []);

  const filtered = query.trim().length < 2
    ? []
    : allBookings.filter((b) => {
        const q = query.toLowerCase();
        return (
          b.Nome?.toLowerCase().includes(q) ||
          b.OTA?.toLowerCase().includes(q) ||
          b.CheckIn?.includes(q) ||
          b.CheckOut?.includes(q) ||
          b.Note?.toLowerCase().includes(q)
        );
      });

  return (
    <div className="flex flex-col h-full">
      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nome, OTA, data..."
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {loading && (
          <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Caricamento prenotazioni...</span>
          </div>
        )}

        {!loading && query.trim().length < 2 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            Digita almeno 2 caratteri per cercare
          </div>
        )}

        {!loading && query.trim().length >= 2 && filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            Nessuna prenotazione trovata
          </div>
        )}

        {filtered.map((booking, idx) => (
          <SearchResultItem
            key={booking.id || idx}
            booking={booking}
            onClick={() => onSelectBooking(booking)}
          />
        ))}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-center text-slate-400 pt-2 shrink-0">
          {filtered.length} risultat{filtered.length === 1 ? "o" : "i"}
        </p>
      )}
    </div>
  );
};

interface BookingSearchProps {
  className?: string;
}

const BookingSearch: React.FC<BookingSearchProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectBooking = useCallback((booking: Booking) => {
    setSelectedBooking(booking);
    setOpen(false);
    setModalOpen(true);
  }, []);

  const handleModalUpdate = useCallback(() => {
    setModalOpen(false);
    setSelectedBooking(null);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        title="Cerca prenotazione"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Mobile: bottom sheet full-screen style */}
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            className="rounded-t-[2.5rem] border-none bg-white dark:bg-slate-950 p-5 pb-6 flex flex-col"
            style={{ height: "90dvh" }}
          >
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4 shrink-0" />
            <SheetTitle className="text-lg font-black mb-4 shrink-0">
              Cerca prenotazione
            </SheetTitle>
            <div className="flex-1 min-h-0">
              <BookingSearchInner onSelectBooking={handleSelectBooking} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        /* Desktop: dialog modal */
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg rounded-3xl p-6 flex flex-col gap-0" style={{ height: "75vh" }}>
            <DialogTitle className="text-lg font-black mb-4 shrink-0">
              Cerca prenotazione
            </DialogTitle>
            <div className="flex-1 min-h-0">
              <BookingSearchInner onSelectBooking={handleSelectBooking} />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Booking detail modal */}
      {selectedBooking && (
        <BookingModal
          open={modalOpen}
          onOpenChange={(v) => {
            setModalOpen(v);
            if (!v) setSelectedBooking(null);
          }}
          booking={selectedBooking}
          calendarType={calendarTypeFromApartment(selectedBooking.apartment)}
          onUpdate={handleModalUpdate}
        />
      )}
    </>
  );
};

export default BookingSearch;
