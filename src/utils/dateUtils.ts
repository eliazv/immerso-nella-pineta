import { parseISO } from "date-fns";

/**
 * Parses a date string in various formats (DD/MM/YYYY or YYYY-MM-DD)
 * @param dateString - The date string to parse
 * @returns Date object or null if parsing fails
 */
export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  // Clean the string from any spaces
  const cleanDateString = dateString.trim();

  // Try DD/MM/YYYY format first
  if (cleanDateString.includes("/")) {
    const parts = cleanDateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      // Validate the values
      if (
        !isNaN(day) &&
        !isNaN(month) &&
        !isNaN(year) &&
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 1900
      ) {
        return new Date(year, month - 1, day);
      }
    }
  }

  // Try YYYY-MM-DD format
  if (cleanDateString.includes("-")) {
    try {
      return parseISO(cleanDateString);
    } catch {
      return null;
    }
  }

  return null;
};

/**
 * Formats a date to DD/MM/YYYY format
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formats a date to YYYY-MM-DD format (for HTML date inputs)
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Calculates the number of nights between two dates
 * @param checkIn - Check-in date string
 * @param checkOut - Check-out date string
 * @returns Number of nights or 0 if dates are invalid
 */
export const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = parseDate(checkIn);
  const checkOutDate = parseDate(checkOut);
  
  if (!checkInDate || !checkOutDate) return 0;
  
  const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return Math.max(0, daysDiff);
};
