import { Booking, CalendarType } from '@/types/calendar';

// Simple iCal parser for vacation rental platforms
export interface ICalEvent {
  summary: string;
  dtstart: string;
  dtend: string;
  description?: string;
  uid: string;
}

export class ICalImportService {
  // Parse iCal data and convert to bookings
  static parseICalData(icalData: string): ICalEvent[] {
    const events: ICalEvent[] = [];
    const lines = icalData.split('\n').map(line => line.trim());
    
    let currentEvent: Partial<ICalEvent> = {};
    let inEvent = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
      } else if (line === 'END:VEVENT' && inEvent) {
        if (currentEvent.summary && currentEvent.dtstart && currentEvent.dtend && currentEvent.uid) {
          events.push(currentEvent as ICalEvent);
        }
        inEvent = false;
      } else if (inEvent) {
        if (line.startsWith('SUMMARY:')) {
          currentEvent.summary = this.unescapeICalText(line.substring(8));
        } else if (line.startsWith('DTSTART:') || line.startsWith('DTSTART;')) {
          currentEvent.dtstart = this.extractDateTime(line);
        } else if (line.startsWith('DTEND:') || line.startsWith('DTEND;')) {
          currentEvent.dtend = this.extractDateTime(line);
        } else if (line.startsWith('DESCRIPTION:')) {
          currentEvent.description = this.unescapeICalText(line.substring(12));
        } else if (line.startsWith('UID:')) {
          currentEvent.uid = line.substring(4);
        }
      }
    }
    
    return events;
  }

  // Extract date/time from iCal format
  private static extractDateTime(line: string): string {
    const match = line.match(/:(\d{8}T?\d{0,6}Z?)/);
    if (match) {
      return match[1];
    }
    return '';
  }

  // Unescape iCal text (remove escaping for commas, semicolons, etc.)
  private static unescapeICalText(text: string): string {
    return text
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .replace(/\\n/g, '\n')
      .replace(/\\\\/g, '\\');
  }

  // Convert iCal date to DD/MM/YYYY format
  static convertICalDateToBookingFormat(icalDate: string): string {
    try {
      // Handle different iCal date formats
      let dateStr = icalDate;
      
      // Remove timezone info and time for date-only events
      if (dateStr.includes('T')) {
        dateStr = dateStr.split('T')[0];
      }
      
      // Parse YYYYMMDD format
      if (dateStr.length === 8) {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        return `${day}/${month}/${year}`;
      }
      
      return '';
    } catch (error) {
      console.error('Error converting iCal date:', error);
      return '';
    }
  }

  // Calculate number of nights between two dates
  static calculateNights(startDate: string, endDate: string): number {
    try {
      const start = new Date(this.convertICalDateToJSDate(startDate));
      const end = new Date(this.convertICalDateToJSDate(endDate));
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch (error) {
      console.error('Error calculating nights:', error);
      return 0;
    }
  }

  // Convert iCal date to JavaScript Date format
  private static convertICalDateToJSDate(icalDate: string): string {
    let dateStr = icalDate;
    
    if (dateStr.includes('T')) {
      dateStr = dateStr.split('T')[0];
    }
    
    if (dateStr.length === 8) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      return `${year}-${month}-${day}`;
    }
    
    return '';
  }

  // Convert iCal events to Booking objects
  static convertICalEventsToBookings(events: ICalEvent[], apartmentId: CalendarType, defaultOTA: string = 'Imported'): Booking[] {
    return events.map((event, index) => {
      const checkIn = this.convertICalDateToBookingFormat(event.dtstart);
      const checkOut = this.convertICalDateToBookingFormat(event.dtend);
      const nights = this.calculateNights(event.dtstart, event.dtend);

      const booking: Booking = {
        Nome: event.summary || `Prenotazione Importata ${index + 1}`,
        OTA: this.extractOTAFromSummary(event.summary) || defaultOTA,
        CheckIn: checkIn,
        CheckOut: checkOut,
        Notti: nights.toString(),
        adulti: '',
        bambini: '',
        animali: '',
        TotaleCliente: '',
        FuoriOTA: '',
        CostoNotti: '',
        MediaANotte: '',
        Pulizia: '',
        Sconti: '',
        SoggiornoTax: '',
        SoggiornoTaxRiscossa: '',
        OTATax: '',
        CedolareSecca: '',
        Totale: '',
        Note: event.description || 'Importato da iCal',
        id: event.uid,
        apartment: apartmentId !== 'all' ? apartmentId : undefined
      };

      return booking;
    });
  }

  // Try to extract OTA from booking title/summary
  private static extractOTAFromSummary(summary: string): string | null {
    if (!summary) return null;
    
    const summaryLower = summary.toLowerCase();
    
    if (summaryLower.includes('booking') || summaryLower.includes('booking.com')) {
      return 'Booking';
    } else if (summaryLower.includes('airbnb')) {
      return 'Airbnb';
    } else if (summaryLower.includes('vrbo')) {
      return 'VRBO';
    } else if (summaryLower.includes('expedia')) {
      return 'Expedia';
    } else if (summaryLower.includes('homeaway')) {
      return 'HomeAway';
    }
    
    return null;
  }

  // Validate iCal data format
  static validateICalData(data: string): { isValid: boolean; error?: string } {
    if (!data || typeof data !== 'string') {
      return { isValid: false, error: 'I dati iCal sono vuoti o non validi' };
    }

    if (!data.includes('BEGIN:VCALENDAR')) {
      return { isValid: false, error: 'File iCal non valido: manca BEGIN:VCALENDAR' };
    }

    if (!data.includes('END:VCALENDAR')) {
      return { isValid: false, error: 'File iCal non valido: manca END:VCALENDAR' };
    }

    const events = this.parseICalData(data);
    if (events.length === 0) {
      return { isValid: false, error: 'Nessun evento trovato nel file iCal' };
    }

    return { isValid: true };
  }

  // Fetch iCal data from URL
  static async fetchICalFromUrl(url: string): Promise<string> {
    try {
      // Since we can't make direct CORS requests to external calendar URLs from the browser,
      // we'll need to use a proxy or handle this server-side
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Error fetching iCal from URL:', error);
      throw new Error('Impossibile scaricare il calendario dal URL fornito. Verifica che l\'URL sia corretto e accessibile.');
    }
  }
}