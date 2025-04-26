import React, { useState } from "react";
import { Booking } from "@/types/calendar";

interface BookingsListProps {
  bookings: Booking[];
}

export const BookingsList: React.FC<BookingsListProps> = ({ bookings }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState<boolean>(true);

  // Funzione per filtrare le prenotazioni future
  const getFilteredBookings = () => {
    if (!showOnlyUpcoming) return bookings;

    const today = new Date();
    return bookings.filter((booking) => {
      // Converti la data di checkout da formato DD/MM/YYYY a Date
      const [checkoutDay, checkoutMonth, checkoutYear] =
        booking.CheckOut.split("/");
      const checkoutDate = new Date(
        `${checkoutYear}-${checkoutMonth}-${checkoutDay}`
      );

      // Mantieni la prenotazione se la data di checkout è oggi o successiva
      return checkoutDate >= today;
    });
  };

  const getOtaLogo = (ota: string) => {
    if (ota.toLowerCase() === "booking") {
      return (
        <img
          src="https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg"
          alt="Booking"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "airbnb") {
      return (
        <img
          src="https://img.icons8.com/?size=512&id=103424&format=png"
          alt="Airbnb"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "extra") {
      return (
        <img
          src="https://cdn-icons-png.freepik.com/512/5361/5361038.png?size=512&id=103424&format=png"
          alt="Airbnb"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "agenzia") {
      return (
        <img
          src="https://cdn-icons-png.freepik.com/256/6522/6522039.png?size=512&id=103424&format=png"
          alt="Airbnb"
          className="inline-block h-5 w-auto"
        />
      );
    }

    return <span>{ota}</span>; // Fallback per altri OTA
  };

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h3 className="font-serif text-lg font-medium">Lista Prenotazioni</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowOnlyUpcoming(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              showOnlyUpcoming
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Prossime
          </button>
          <button
            onClick={() => setShowOnlyUpcoming(false)}
            className={`px-3 py-1 text-sm rounded-md ${
              !showOnlyUpcoming
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Tutte
          </button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">Nessuna prenotazione trovata.</p>
      ) : (
        <div className="space-y-4">
          {getFilteredBookings().map((booking, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <div>
                  <strong>
                    {getOtaLogo(booking.OTA)} {booking.Nome}
                  </strong>{" "}
                  -{" "}
                  <span>
                    {booking.CheckIn} → {booking.CheckOut} ({booking.Notti}{" "}
                    notti - {booking.Totale} )
                  </span>
                </div>
                <button className="text-primary">
                  {expandedIndex === index ? "Nascondi" : "Dettagli"}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="mt-4 text-sm text-muted-foreground grid grid-cols-3 gap-4">
                  <div>
                    <p>
                      <strong>Nome:</strong> {booking.Nome}
                    </p>
                    <p>
                      <strong>OTA:</strong> {booking.OTA}
                    </p>
                    <p>
                      <strong>Check-in:</strong> {booking.CheckIn}
                    </p>
                    <p>
                      <strong>Check-out:</strong> {booking.CheckOut}
                    </p>
                    <p>
                      <strong>Notti:</strong> {booking.Notti}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Adulti:</strong> {booking.adulti || "0"}
                    </p>
                    <p>
                      <strong>Bambini:</strong> {booking.bambini || "0"}
                    </p>
                    <p>
                      <strong>Totale Cliente:</strong>{" "}
                      {booking.TotaleCliente || "N/A"}
                    </p>
                    <p>
                      <strong>Fuori OTA:</strong> {booking.FuoriOTA || "N/A"}
                    </p>
                    <p>
                      <strong>Costo Notti:</strong>{" "}
                      {booking.CostoNotti || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Media a Notte:</strong>{" "}
                      {booking.MediaANotte || "N/A"}
                    </p>
                    <p>
                      <strong>Pulizia:</strong> {booking.Pulizia || "N/A"}
                    </p>
                    <p>
                      <strong>Sconti:</strong> {booking.Sconti || "N/A"}
                    </p>
                    <p>
                      <strong>Soggiorno Tax:</strong>{" "}
                      {booking.SoggiornoTax || "N/A"}
                    </p>
                    <p>
                      <strong>OTA Tax:</strong> {booking.OTATax || "N/A"}
                    </p>
                    <p>
                      <strong>Cedolare Secca (21%):</strong>{" "}
                      {booking.CedolareSecca || "N/A"}
                    </p>
                    <p>
                      <strong>Totale:</strong> {booking.Totale || "N/A"}
                    </p>
                    {booking.Note && (
                      <p>
                        <strong>Note:</strong> {booking.Note}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsList;
