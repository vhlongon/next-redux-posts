'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
};

export default function Error({ error }: ErrorProps) {
  const { id } = useParams();

  useEffect(() => {
    // as a example or log error to an external service for example
    console.error(error);
    console.error(error.digest);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>'
      <h2>trying to fetch the post for id {id}</h2>
      <p>Error: {error.message}</p>
    </div>
  );
}
