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
    className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white hover:shadow-md cursor-pointer transition-all duration-200"
    onClick={() => onClick(booking)}
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      {/* Sinistra: Nome ospite, logo OTA, appartamento */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="shrink-0">{getOtaLogo(booking.OTA)}</span>
        <span className="font-semibold">{booking.Nome}</span>
        {booking.apartment && (
          <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
            {getApartmentShortName(booking.apartment)}
          </span>
        )}
      </div>
      {/* Centro: Date e notti */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span className="font-mono bg-gray-200 rounded px-1 py-0.5">
          {booking.CheckIn}
        </span>
        <span className="mx-1 text-gray-400">→</span>
        <span className="font-mono bg-gray-200 rounded px-1 py-0.5">
          {booking.CheckOut}
        </span>
        <span className="ml-2 text-xs text-gray-500">
          {booking.Notti} notti
        </span>
      </div>
      {/* Destra: Totale */}
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-primary">
          {booking.Totale}
        </span>
      </div>
    </div>
  </div>
);

export default BookingCard;
