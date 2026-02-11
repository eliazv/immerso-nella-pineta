import React from "react";

export function getOtaLogo(ota: string) {
  if (!ota) return null;
  switch (ota.toLowerCase()) {
    case "booking":
      return (
        <img
          src="https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg"
          alt="Booking"
          className="inline-block h-5 w-auto"
        />
      );
    case "airbnb":
      return (
        <img
          src="https://img.icons8.com/?size=512&id=103424&format=png"
          alt="Airbnb"
          className="inline-block h-5 w-auto"
        />
      );
    case "extra":
      return (
        <img
          src="https://www.freeiconspng.com/uploads/message-icon-png-10.png"
          alt="Extra"
          className="inline-block h-5 w-auto"
        />
      );
    case "agenzia":
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/256/5775/5775402.png"
          alt="Agenzia"
          className="inline-block h-5 w-auto"
        />
      );
    default:
      return <span>{ota}</span>;
  }
}
