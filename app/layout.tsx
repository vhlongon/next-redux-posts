import './styles/globals.css';

import type { PropsWithChildren } from 'react';
import { StoreProvider } from './StoreProvider';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section>
            <header>header</header>
            <main>{children}</main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
