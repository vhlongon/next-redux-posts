import './styles/globals.css';
import { orbitron, spaceGrotesk } from './styles/fonts';
import StyledComponentsRegistry from '@/app/styles/registry';
import type { PropsWithChildren } from 'react';
import { StoreProvider } from './Providers/StoreProvider';
import { ThemeProvider } from './Providers/ThemeProvider';
import { Header } from './components/Header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <html
        lang="en"
        className={`${orbitron.variable} ${spaceGrotesk.variable}`}
      >
        <body
          style={{
            padding: 'var(--spacing-xxxl)',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <StyledComponentsRegistry>
            <ThemeProvider>
              <Header />
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
