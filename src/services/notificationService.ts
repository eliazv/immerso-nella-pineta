import { toast } from "sonner";

class NotificationService {
  private permission: NotificationPermission = "default";

  constructor() {
    if (typeof window !== "undefined" && "Notification" in window) {
      this.permission = Notification.permission;
    }
  }

  async requestPermission() {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    }
    return "denied";
  }

  sendNotification(title: string, body: string, icon?: string) {
    // Always show toast
    toast.info(title, {
      description: body,
    });

    // Try to show browser notification if allowed
    if (this.permission === "granted" && typeof window !== "undefined") {
      try {
        new Notification(title, { body, icon: icon || "/favicon.ico" });
      } catch (e) {
        console.error("Error sending browser notification", e);
      }
    }
  }

  // Check for upcoming bookings (mock logic, should be integrated with real data)
  checkBookingEvents(bookings: any[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    bookings.forEach((booking) => {
      const startDate = new Date(booking.startDate || booking.start);
      const endDate = new Date(booking.endDate || booking.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (startDate.getTime() === today.getTime()) {
        this.sendNotification(
          "Inizio Prenotazione",
          `Oggi inizia la prenotazione di ${booking.guestName || "un ospite"} a ${booking.apartment || "Pineta"}`,
        );
      }

      if (endDate.getTime() === today.getTime()) {
        this.sendNotification(
          "Fine Prenotazione",
          `Oggi termina la prenotazione di ${booking.guestName || "un ospite"}`,
        );
      }
    });
  }
}

export const notificationService = new NotificationService();
