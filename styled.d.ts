// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      heading: string;
      body: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      pill: string;
    };
    borderWidth: {
      sm: string;
      md: string;
      lg: string;
    };
    colors: {
      // Base colors
      background: string;
      surface: string;

      // Neon accent colors
      neonPink: string;
      neonBlue: string;
      neonPurple: string;
      neonGreen: string;

      // Text colors
      textPrimary: string;
      textSecondary: string;

      // Gradient combinations
      gradientPinkBlue: string;
      gradientPurpleGreen: string;
    };
    transition: {
      default: string;
      fast: string;
    };
  }
}
