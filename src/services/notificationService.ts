import { Booking } from "@/types/calendar";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { it } from "date-fns/locale";

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
}

export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = "default";

  private constructor() {
    this.checkPermission();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async checkPermission(): Promise<void> {
    if ("Notification" in window) {
      this.permission = Notification.permission;
    }
  }

  public async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications");
      return false;
    }

    if (this.permission === "granted") {
      return true;
    }

    if (this.permission !== "denied") {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === "granted";
    }

    return false;
  }

  public async showNotification(data: NotificationData): Promise<void> {
    const hasPermission = await this.requestPermission();
    
    if (!hasPermission) {
      console.warn("Notification permission not granted");
      return;
    }

    try {
      // Check if we're in a service worker context
      if ("serviceWorker" in navigator && "showNotification" in ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(data.title, {
          body: data.body,
          icon: data.icon || "/rentpilot.svg",
          badge: data.badge || "/rentpilot.svg",
          tag: data.tag,
          data: data.data,
          requireInteraction: true,
          actions: [
            {
              action: "view",
              title: "Visualizza"
            },
            {
              action: "dismiss",
              title: "Chiudi"
            }
          ]
        });
      } else {
        // Fallback to regular notification
        new Notification(data.title, {
          body: data.body,
          icon: data.icon || "/rentpilot.svg",
          tag: data.tag,
          data: data.data,
        });
      }
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  }

  public scheduleBookingNotifications(booking: Booking, apartmentName: string): void {
    const checkInDate = this.parseBookingDate(booking.CheckIn);
    const checkOutDate = this.parseBookingDate(booking.CheckOut);

    if (!checkInDate || !checkOutDate) {
      console.warn("Invalid dates for booking notifications");
      return;
    }

    // Schedule check-in notification
    this.scheduleNotificationForDate(checkInDate, {
      title: "Check-in Oggi",
      body: `${booking.Nome} - Check-in in ${apartmentName}`,
      tag: `checkin-${booking.id}`,
      data: {
        type: "checkin",
        bookingId: booking.id,
        apartment: apartmentName,
        guest: booking.Nome
      }
    });

    // Schedule check-out notification
    this.scheduleNotificationForDate(checkOutDate, {
      title: "Check-out Oggi",
      body: `${booking.Nome} - Check-out da ${apartmentName}`,
      tag: `checkout-${booking.id}`,
      data: {
        type: "checkout",
        bookingId: booking.id,
        apartment: apartmentName,
        guest: booking.Nome
      }
    });
  }

  private parseBookingDate(dateString: string): Date | null {
    try {
      // Assuming format DD/MM/YYYY
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
      return null;
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  }

  private scheduleNotificationForDate(date: Date, notification: NotificationData): void {
    const now = new Date();
    const targetTime = new Date(date);
    targetTime.setHours(9, 0, 0, 0); // Set to 9:00 AM

    if (isToday(targetTime)) {
      // Show immediately if it's today
      this.showNotification(notification);
    } else if (isTomorrow(targetTime)) {
      // Schedule for tomorrow at 9 AM
      const timeUntilNotification = targetTime.getTime() - now.getTime();
      if (timeUntilNotification > 0) {
        setTimeout(() => {
          this.showNotification(notification);
        }, timeUntilNotification);
      }
    } else if (targetTime > now) {
      // For future dates, we would need a more sophisticated scheduling system
      // For now, we'll just store the notification data in localStorage
      this.storeScheduledNotification(targetTime, notification);
    }
  }

  private storeScheduledNotification(date: Date, notification: NotificationData): void {
    const scheduledNotifications = this.getScheduledNotifications();
    const notificationData = {
      date: date.toISOString(),
      notification: notification
    };
    
    scheduledNotifications.push(notificationData);
    localStorage.setItem('scheduledNotifications', JSON.stringify(scheduledNotifications));
  }

  private getScheduledNotifications(): any[] {
    try {
      const stored = localStorage.getItem('scheduledNotifications');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error getting scheduled notifications:", error);
      return [];
    }
  }

  public checkScheduledNotifications(): void {
    const scheduledNotifications = this.getScheduledNotifications();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const notificationsToShow = scheduledNotifications.filter(item => {
      const notificationDate = new Date(item.date);
      const notificationDay = new Date(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate());
      return notificationDay.getTime() === today.getTime();
    });

    notificationsToShow.forEach(item => {
      this.showNotification(item.notification);
    });

    // Remove shown notifications
    const remainingNotifications = scheduledNotifications.filter(item => {
      const notificationDate = new Date(item.date);
      const notificationDay = new Date(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate());
      return notificationDay.getTime() !== today.getTime();
    });

    localStorage.setItem('scheduledNotifications', JSON.stringify(remainingNotifications));
  }

  public cancelBookingNotifications(bookingId: string): void {
    // Remove from scheduled notifications
    const scheduledNotifications = this.getScheduledNotifications();
    const filteredNotifications = scheduledNotifications.filter(item => 
      !item.notification.tag?.includes(bookingId)
    );
    localStorage.setItem('scheduledNotifications', JSON.stringify(filteredNotifications));
  }
}

// Initialize the service and check for scheduled notifications on app start
export const notificationService = NotificationService.getInstance();

// Check for scheduled notifications every hour
setInterval(() => {
  notificationService.checkScheduledNotifications();
}, 60 * 60 * 1000); // 1 hour

// Check immediately on load
notificationService.checkScheduledNotifications();
