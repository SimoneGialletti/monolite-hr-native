import { enUS, it, arEG, ro, sq, fr } from 'date-fns/locale';
import { format } from 'date-fns';
import i18n from '@/i18n/config';

const localeMap: Record<string, Locale> = {
  en: enUS,
  it: it,
  'ar-eg': arEG,
  ro: ro,
  sq: sq,
  fr: fr,
};

/**
 * Get the date-fns locale for the current i18n language
 */
export function getDateLocale(): Locale {
  const lang = i18n.language || 'en';
  return localeMap[lang] || enUS;
}

/**
 * Format a date with the current locale
 * @param date - The date to format
 * @param formatStr - The date-fns format string (e.g., 'PPP', 'MMM dd, yyyy')
 * @returns Formatted date string in the current locale
 */
export function formatLocalizedDate(date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: getDateLocale() });
}

/**
 * Format a date as YYYY-MM-DD in local timezone (not UTC).
 * Use this instead of date.toISOString().split('T')[0] which converts to UTC first.
 */
export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
