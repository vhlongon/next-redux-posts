'use client';

import { type ReactNode, useEffect } from 'react';

export type BaseErrorProps = {
  error: Error & {
    digest?: string;
  };
};

type ErrorProps = BaseErrorProps & {
  text: ReactNode;
};

export const ErrorComponent = ({ error, text }: ErrorProps) => {
  useEffect(() => {
    // as a example or log error to an external service for example
    console.error(error);
    console.error(error.digest);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
      <h2>Something went wrong!</h2>
      <p>{text}</p>
      <code>
        <pre>{error.message}</pre>
      </code>
    </div>
  );
};
