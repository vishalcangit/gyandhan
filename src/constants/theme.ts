import {StyleSheet} from 'react-native';
import {Colors} from './colors';

// Spacing scale (4px base)
export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Border radius scale
export const BorderRadius = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 14,
  xxl: 16,
  round: 9999,
} as const;

// Typography scale
export const Typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  smallBold: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  tiny: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
    lineHeight: 14,
  },
  micro: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.textLight,
    lineHeight: 12,
  },
});

// Shadow presets
export const Shadows = StyleSheet.create({
  sm: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  button: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

// Animation durations
export const Animation = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

