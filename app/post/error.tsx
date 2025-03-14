'use client';

import { useParams } from 'next/navigation';
import { type BaseErrorProps, ErrorComponent } from '../components/Error';

export default function PostError({ error }: BaseErrorProps) {
  const { id } = useParams();

  return <ErrorComponent error={error} text={`Error trying to fetch the post for id: ${id}`} />;
}
