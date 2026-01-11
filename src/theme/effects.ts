/**
 * Visual effects: shadows, glows, animations
 */

import { colors } from './colors';

/**
 * Gold glow shadow effect
 * Equivalent to: box-shadow: 0 0 12px hsl(var(--gold) / 0.4)
 */
export const goldGlow = {
  shadowColor: colors.gold,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.4,
  shadowRadius: 12,
  elevation: 8, // Android
};

/**
 * Intense gold glow shadow effect
 * Equivalent to: box-shadow: 0 0 20px hsl(var(--gold) / 0.8)
 */
export const goldGlowIntense = {
  shadowColor: colors.gold,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.8,
  shadowRadius: 20,
  elevation: 12, // Android
};

/**
 * Standard shadow for cards
 */
export const cardShadow = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, // Android
};

/**
 * Transition duration in milliseconds
 */
export const transitionDuration = {
  fast: 150,
  normal: 300, // 0.3s ease-in-out
  slow: 500,
} as const;

/**
 * Scale values for animations
 */
export const scale = {
  hover: 1.05, // scale-105
  active: 0.95, // scale-95
  normal: 1.0,
} as const;

export type Effects = typeof goldGlow & typeof goldGlowIntense & typeof cardShadow;
