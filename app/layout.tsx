import './styles/globals.css';
import { orbitron, spaceGrotesk } from './styles/fonts';
import StyledComponentsRegistry from '@/lib/registry';
import type { PropsWithChildren } from 'react';
import { StoreProvider } from './Providers/StoreProvider';
import { ThemeProvider } from './Providers/ThemeProvider';
import { Header } from './components/Header';
import { headers } from 'next/headers';

export default async function RootLayout({ children }: PropsWithChildren) {
  const headersList = await headers();
  const fullUrl = headersList.get('referer') || '';
  const pathname = fullUrl.split('/').pop() || '';

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
              <Header pathname={pathname} />
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
