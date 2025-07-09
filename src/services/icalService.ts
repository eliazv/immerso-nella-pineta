import { Booking } from "@/types/calendar";
import { format } from "date-fns";

// Simple iCal parser since we're in browser environment
interface ICalEvent {
  summary: string;
  dtstart: Date;
  dtend: Date;
  description?: string;
  location?: string;
}

export class ICalService {
  static parseICalFile(fileContent: string): ICalEvent[] {
    const events: ICalEvent[] = [];
    const lines = fileContent.split(/\r?\n/);
    
    let currentEvent: Partial<ICalEvent> = {};
    let inEvent = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
      } else if (line === 'END:VEVENT' && inEvent) {
        if (currentEvent.summary && currentEvent.dtstart && currentEvent.dtend) {
          events.push(currentEvent as ICalEvent);
        }
        inEvent = false;
      } else if (inEvent) {
        if (line.startsWith('SUMMARY:')) {
          currentEvent.summary = line.substring(8);
        } else if (line.startsWith('DTSTART')) {
          const dateStr = line.split(':')[1];
          currentEvent.dtstart = this.parseICalDate(dateStr);
        } else if (line.startsWith('DTEND')) {
          const dateStr = line.split(':')[1];
          currentEvent.dtend = this.parseICalDate(dateStr);
        } else if (line.startsWith('DESCRIPTION:')) {
          currentEvent.description = line.substring(12);
        } else if (line.startsWith('LOCATION:')) {
          currentEvent.location = line.substring(9);
        }
      }
    }
    
    return events;
  }
  
  private static parseICalDate(dateStr: string): Date {
    // Handle different iCal date formats
    if (dateStr.includes('T')) {
      // Format: 20231115T140000Z or 20231115T140000
      const cleanDate = dateStr.replace(/[TZ]/g, '');
      const year = parseInt(cleanDate.substring(0, 4));
      const month = parseInt(cleanDate.substring(4, 6)) - 1; // Month is 0-indexed
      const day = parseInt(cleanDate.substring(6, 8));
      const hour = parseInt(cleanDate.substring(8, 10)) || 0;
      const minute = parseInt(cleanDate.substring(10, 12)) || 0;
      const second = parseInt(cleanDate.substring(12, 14)) || 0;
      
      return new Date(year, month, day, hour, minute, second);
    } else {
      // Format: 20231115 (date only)
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      
      return new Date(year, month, day);
    }
  }
  
  static convertEventsToBookings(events: ICalEvent[], apartmentId: string): Booking[] {
    return events.map((event, index) => {
      const checkIn = format(event.dtstart, 'dd/MM/yyyy');
      const checkOut = format(event.dtend, 'dd/MM/yyyy');
      
      // Calculate nights
      const diffTime = event.dtend.getTime() - event.dtstart.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Extract guest name from summary (assuming format like "Guest Name - Booking")
      const guestName = event.summary.split(' - ')[0] || event.summary;
      
      // Try to extract OTA from description or summary
      let ota = 'Direct';
      const description = (event.description || '').toLowerCase();
      const summary = event.summary.toLowerCase();
      
      if (description.includes('airbnb') || summary.includes('airbnb')) {
        ota = 'Airbnb';
      } else if (description.includes('booking') || summary.includes('booking.com')) {
        ota = 'Booking.com';
      } else if (description.includes('vrbo') || summary.includes('vrbo')) {
        ota = 'VRBO';
      }
      
      const booking: Booking = {
        id: `ical-${Date.now()}-${index}`,
        Nome: guestName,
        OTA: ota,
        CheckIn: checkIn,
        CheckOut: checkOut,
        Notti: diffDays.toString(),
        adulti: '2', // Default values
        bambini: '0',
        animali: '0',
        TotaleCliente: '',
        FuoriOTA: '',
        CostoNotti: '',
        MediaANotte: '',
        Pulizia: '',
        Sconti: '',
        SoggiornoTax: '',
        OTATax: '',
        CedolareSecca: '',
        Totale: '',
        Note: event.description || '',
        apartment: apartmentId
      };
      
      return booking;
    });
  }
  
  static async readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }
}
