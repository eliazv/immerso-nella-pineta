/**
 * Formats a number as currency (Euro)
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Formats a number with thousand separators
 * @param number - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("it-IT").format(number);
};

/**
 * Parses a currency string to number
 * @param currencyString - The currency string to parse
 * @returns Parsed number or 0 if parsing fails
 */
export const parseCurrency = (currencyString: string): number => {
  if (!currencyString) return 0;
  
  // Remove currency symbols and spaces, replace comma with dot
  const cleanString = currencyString
    .replace(/[€$£¥]/g, "")
    .replace(/\s/g, "")
    .replace(",", ".");
  
  const parsed = parseFloat(cleanString);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formats a percentage
 * @param value - The value to format as percentage
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return new Intl.NumberFormat("it-IT", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Truncates text to specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Capitalizes the first letter of a string
 * @param text - The text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formats a phone number (Italian format)
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return "";
  
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, "");
  
  // Format based on length
  if (digits.length === 10) {
    // Mobile: 3XX XXX XXXX
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  } else if (digits.length === 11 && digits.startsWith("39")) {
    // International mobile: +39 3XX XXX XXXX
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
  }
  
  return phoneNumber; // Return original if no pattern matches
};

/**
 * Formats guest count for display
 * @param adults - Number of adults
 * @param children - Number of children
 * @param pets - Number of pets
 * @returns Formatted guest string
 */
export const formatGuestCount = (
  adults: number,
  children: number = 0,
  pets: number = 0
): string => {
  const parts: string[] = [];
  
  if (adults > 0) {
    parts.push(`${adults} adult${adults > 1 ? "i" : "o"}`);
  }
  
  if (children > 0) {
    parts.push(`${children} bambin${children > 1 ? "i" : "o"}`);
  }
  
  if (pets > 0) {
    parts.push(`${pets} animal${pets > 1 ? "i" : "e"}`);
  }
  
  return parts.join(", ");
};
