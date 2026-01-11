/**
 * Color definitions for the app
 * Converted from HSL to hex format for React Native
 */

export const colors = {
  // Background colors
  background: '#0E0E0E', // hsl(0, 0%, 5.5%)
  foreground: '#FFFFFF', // hsl(0, 0%, 100%)
  
  // Card colors
  card: '#1C1C1C', // hsl(0, 0%, 11%)
  cardForeground: '#FFFFFF', // hsl(0, 0%, 100%)
  
  // Popover colors
  popover: '#1C1C1C', // hsl(0, 0%, 11%)
  popoverForeground: '#FFFFFF', // hsl(0, 0%, 100%)
  
  // Primary (Gold)
  primary: '#FFD700', // hsl(51, 100%, 50%)
  primaryForeground: '#1A1A1A', // hsl(0, 0%, 10%)
  
  // Secondary
  secondary: '#262626', // hsl(0, 0%, 15%)
  secondaryForeground: '#FFFFFF', // hsl(0, 0%, 100%)
  
  // Muted
  muted: '#333333', // hsl(0, 0%, 20%)
  mutedForeground: '#A6A6A6', // hsl(0, 0%, 65%)
  
  // Accent (Gold)
  accent: '#FFD700', // hsl(51, 100%, 50%)
  accentForeground: '#1A1A1A', // hsl(0, 0%, 10%)
  
  // Destructive
  destructive: '#CC3333', // hsl(0, 70%, 50%)
  destructiveForeground: '#FFFFFF', // hsl(0, 0%, 100%)
  
  // Border and input
  border: '#333333', // hsl(0, 0%, 20%)
  input: '#262626', // hsl(0, 0%, 15%)
  ring: '#FFD700', // hsl(51, 100%, 50%)
  
  // Gold (signature color)
  gold: '#FFD700', // hsl(51, 100%, 50%)
  goldGlow: '#FFD700', // hsl(51, 100%, 50%)
} as const;

export type Colors = typeof colors;
