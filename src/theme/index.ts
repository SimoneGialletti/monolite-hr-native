/**
 * Theme exports
 * Centralized theme system for the app
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './borderRadius';
export * from './effects';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { borderRadius } from './borderRadius';
import { goldGlow, goldGlowIntense, cardShadow, transitionDuration, scale } from './effects';

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  effects: {
    goldGlow,
    goldGlowIntense,
    cardShadow,
    transitionDuration,
    scale,
  },
} as const;

export default theme;
