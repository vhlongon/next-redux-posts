'use client';

import type { ReactNode } from 'react';
import { type DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

/**
 * @description Cyberpunk theme
 * see app/styles/globals.css for the variables used in the theme
 */
export const cyberpunkTheme: DefaultTheme = {
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)'
  },
  fontSizes: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    xxl: 'var(--font-size-xxl)'
  },
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
    pill: 'var(--border-radius-pill)'
  },
  borderWidth: {
    sm: 'var(--border-width-sm)',
    md: 'var(--border-width-md)',
    lg: 'var(--border-width-lg)'
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    base: 'var(--spacing-base)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    xxl: 'var(--spacing-xxl)',
    xxxl: 'var(--spacing-xxxl)'
  },
  colors: {
    // Base colors
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',

    // Neon accent colors
    neonPink: 'var(--color-neon-pink)',
    neonBlue: 'var(--color-neon-blue)',
    neonPurple: 'var(--color-neon-purple)',
    neonGreen: 'var(--color-neon-green)',

    // Text colors
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',

    // Gradient combinations
    gradientPinkBlue: 'var(--gradient-pink-blue)',
    gradientPurpleGreen: 'var(--gradient-purple-green)'
  },
  transition: {
    default: 'var(--transition-default)',
    fast: 'var(--transition-fast)'
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <StyledThemeProvider theme={cyberpunkTheme}>{children}</StyledThemeProvider>;
};
