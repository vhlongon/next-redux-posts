'use client';

import type { PostWithAuthor } from '@/lib/features/posts/postTypes';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

type PostProps = PostWithAuthor & {
  preview?: boolean;
  isNew?: boolean;
};

const fadeInAndOut = keyframes`
  0% {
    box-shadow: 0 0 2rem ${({ theme }) => theme.colors.neonBlue};
  }
  50% {
    box-shadow: 0 0 1rem ${({ theme }) => theme.colors.neonBlue};
  }
  100% {
    box-shadow: 0 0 0 transparent;
  }
`;

export const PostWrapper = styled.article`
  padding: 20px;
  border: ${({ theme }) =>
    `${theme.borderWidth.sm} solid ${theme.colors.neonBlue}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    box-shadow: 0 0 1.5rem ${({ theme }) => theme.colors.neonBlue};
  }

  &.highlighted {
    box-shadow: 0 0 2rem ${({ theme }) => theme.colors.neonBlue};
    animation: ${fadeInAndOut} 3.5s ease-in-out forwards;

    &:hover {
      box-shadow: 0 0 1.5rem ${({ theme }) => theme.colors.neonBlue} !important;
    }
  }
`;

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export const Post = ({
  preview = false,
  title,
  body,
  id,
  author,
  isNew = false,
}: PostProps) => {
  return (
    <PostWrapper className={isNew ? 'highlighted' : ''}>
      <h3>{title}</h3>
      <p>{preview ? truncateText(body, 100) : body}</p>
      <p>
        By: {author.firstName} {author.lastName}
      </p>
      {preview && <Link href={`/post/${id}`}>Read more</Link>}
    </PostWrapper>
  );
};
