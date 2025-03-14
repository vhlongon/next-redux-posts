'use client';

import { type BaseErrorProps, ErrorComponent } from './components/Error';

export default function PostsError({ error }: BaseErrorProps) {
  return <ErrorComponent error={error} text="Error trying to fetch the posts" />;
}
