/**
 * Border radius values
 * Base radius: 0.875rem = 14px
 */

export const borderRadius = {
  none: 0,
  sm: 6, // calc(var(--radius) - 4px) = 14 - 4 = 10, but using 6 for small
  md: 10, // calc(var(--radius) - 2px) = 14 - 2 = 12, but using 10 for medium
  lg: 14, // var(--radius) = 0.875rem = 14px
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;
