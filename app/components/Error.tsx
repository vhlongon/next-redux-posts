'use client';

import { type ReactNode, useEffect } from 'react';
import styled from 'styled-components';

export type BaseErrorProps = {
  error: Error & {
    digest?: string;
  };
};

type ErrorProps = BaseErrorProps & {
  text: ReactNode;
};

const ErrorWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ErrorComponent = ({ error, text }: ErrorProps) => {
  useEffect(() => {
    // as a example or log error to an external service for example
    console.error(error);
    console.error(error.digest);
  }, [error]);

  return (
    <ErrorWrapper>
      <h2>Something went wrong!</h2>
      <p>{text}</p>
      <code>
        <pre>{error.message}</pre>
      </code>
    </ErrorWrapper>
  );
};
