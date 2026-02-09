import React from "react";
import { Booking } from "@/types/calendar";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";

interface BookingCardProps {
  booking: Booking;
  onClick: (booking: Booking) => void;
  getApartmentShortName: (apartment?: string) => string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onClick,
  getApartmentShortName,
}) => (
  <div
    className="relative overflow-hidden border rounded-[1.5rem] p-4 md:p-5 shadow-sm bg-white dark:bg-slate-900 hover:shadow-xl hover:border-primary/30 cursor-pointer transition-all active:scale-[0.99]"
    onClick={() => onClick(booking)}
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      {/* Sinistra: Info Ospite + Totale su Mobile */}
      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0">
          {getOtaLogo(booking.OTA)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-black text-slate-800 dark:text-white truncate text-base md:text-lg">
              {booking.Nome}
            </h4>
            <span className="text-base md:text-lg font-black text-primary sm:hidden">
              {booking.Totale}
            </span>
          </div>
          {booking.apartment && (
            <span className="text-[10px] font-black uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/5 rounded-full border border-primary/20 mt-0.5 inline-block">
              {getApartmentShortName(booking.apartment)}
            </span>
          )}
        </div>
      </div>

      {/* Centro: Date */}
      <div className="flex items-center justify-start sm:justify-center gap-3 py-1 sm:py-0 border-y sm:border-none border-slate-50 dark:border-slate-800">
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase text-slate-400 font-bold">
            In
          </span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs md:text-sm">
            {booking.CheckIn}
          </span>
        </div>
        <div className="h-[1px] w-3 bg-slate-200 dark:bg-slate-700 mt-3" />
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase text-slate-400 font-bold">
            Out
          </span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs md:text-sm">
            {booking.CheckOut}
          </span>
        </div>
        <div className="ml-1 flex flex-col items-center">
          <span className="text-[9px] uppercase text-slate-400 font-bold">
            Notti
          </span>
          <span className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400">
            {booking.Notti}
          </span>
        </div>
      </div>

      {/* Destra: Importo (Desktop) */}
      <div className="hidden sm:flex items-center justify-end sm:min-w-[100px]">
        <span className="text-lg font-black text-primary">
          {booking.Totale}
        </span>
      </div>
    </div>
  </div>
);

export default BookingCard;
