/**
 * Visual effects: shadows, glows, animations
 */

/**
 * Gold glow shadow effect (disabled)
 */
export const goldGlow = {
  shadowColor: 'transparent',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
};

/**
 * Intense gold glow shadow effect (disabled)
 */
export const goldGlowIntense = {
  shadowColor: 'transparent',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
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
