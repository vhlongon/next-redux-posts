import './styles/globals.css';
import { orbitron, spaceGrotesk } from './styles/fonts';
import StyledComponentsRegistry from '@/lib/registry';
import type { PropsWithChildren } from 'react';
import { StoreProvider } from './Providers/StoreProvider';
import { ThemeProvider } from './Providers/ThemeProvider';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <html
        lang="en"
        className={`${orbitron.variable} ${spaceGrotesk.variable}`}
      >
        <body
          style={{
            padding: 'var(--spacing-xl)',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <StyledComponentsRegistry>
            <ThemeProvider>
              <header>
                <h1 className="app-heading" data-text="Posts app">
                  Posts app
                </h1>
              </header>
              <section
                style={{
                  width: '100%',
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <main>{children}</main>
              </section>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}
