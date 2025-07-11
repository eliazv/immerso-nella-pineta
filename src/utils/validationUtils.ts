/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns True if valid email, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a string is not empty after trimming
 * @param value - The string to validate
 * @returns True if not empty, false otherwise
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates if a number is within a specified range
 * @param value - The number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if within range, false otherwise
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validates if a date string represents a valid date
 * @param dateString - The date string to validate
 * @returns True if valid date, false otherwise
 */
export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validates if checkout date is after checkin date
 * @param checkIn - Check-in date string
 * @param checkOut - Check-out date string
 * @returns True if checkout is after checkin, false otherwise
 */
export const isValidDateRange = (checkIn: string, checkOut: string): boolean => {
  if (!checkIn || !checkOut) return false;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return checkOutDate > checkInDate;
};

/**
 * Validates apartment form data
 * @param data - Apartment form data
 * @returns Object with validation result and errors
 */
export const validateApartmentForm = (data: {
  name: string;
  maxGuests: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isNotEmpty(data.name)) {
    errors.push("Il nome è obbligatorio");
  }

  if (!isInRange(data.maxGuests, 1, 20)) {
    errors.push("Il numero massimo di ospiti deve essere tra 1 e 20");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates booking form data
 * @param data - Booking form data
 * @returns Object with validation result and errors
 */
export const validateBookingForm = (data: {
  Nome: string;
  CheckIn: string;
  CheckOut: string;
  apartment: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isNotEmpty(data.Nome)) {
    errors.push("Il nome dell'ospite è obbligatorio");
  }

  if (!isNotEmpty(data.apartment)) {
    errors.push("Seleziona un appartamento");
  }

  if (!isValidDate(data.CheckIn)) {
    errors.push("Data di check-in non valida");
  }

  if (!isValidDate(data.CheckOut)) {
    errors.push("Data di check-out non valida");
  }

  if (data.CheckIn && data.CheckOut && !isValidDateRange(data.CheckIn, data.CheckOut)) {
    errors.push("La data di check-out deve essere successiva al check-in");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
