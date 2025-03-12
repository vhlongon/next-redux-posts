'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
};

export default function PostError({ error }: ErrorProps) {
  const { id } = useParams();

  useEffect(() => {
    // as a example or log error to an external service for example
    console.error(error);
    console.error(error.digest);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
      <h2>Something went wrong!</h2>
      <p>
        Error trying to fetch the post for id: <em>{id}</em>
      </p>
      <code>
        <pre>{error.message}</pre>
      </code>
    </div>
  );
}
