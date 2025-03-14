'use client';

import type { PostWithAuthor } from '@/lib/features/posts/postTypes';
import { compressData } from '@/lib/utils/compression';
import Link from 'next/link';
import styled from 'styled-components';
import Avatar from './Avatar';

type PostProps = PostWithAuthor & {
  preview?: boolean;
  isNew?: boolean;
};

export const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const PostWrapper = styled.article`
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: ${({ theme }) => `${theme.borderWidth.sm} solid ${theme.colors.neonBlue}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    box-shadow: 0 0 1.5rem ${({ theme }) => theme.colors.neonBlue};
  }
`;

const TextContent = styled.div`
  flex-wrap: wrap;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  white-space: pre-wrap;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const Title = styled.h3`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const PreviewWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: ${({ theme }) => theme.spacing.base};
`;

const TextWrapper = styled.p`
  display: flex;
  flex-direction: column;
`;

const FullPostWrapper = styled(TextContent)`
  text-align: center;
`;

export const Post = ({ preview = false, isNew = false, ...post }: PostProps) => {
  const { id, author, title, body } = post;
  const className = isNew ? 'highlighted' : '';

  if (preview) {
    const url = `/post/${id}?post=${compressData(post)}`;
    return (
      <PostWrapper className={className}>
        <PreviewWrapper>
          <Avatar firstName={author.firstName} lastName={author.lastName} size={40} />
          <TextContent>
            <span>
              By: {author.firstName} {author.lastName}
            </span>
            <Title>{title}</Title>
            <TextWrapper>{preview ? truncateText(body, 100) : body}</TextWrapper>
            <Link href={url}>See full post</Link>
          </TextContent>
        </PreviewWrapper>
      </PostWrapper>
    );
  }

  return (
    <PostWrapper className={isNew ? 'highlighted' : ''}>
      <FullPostWrapper>
        <AvatarWrapper>
          <Avatar firstName={author.firstName} lastName={author.lastName} size={80} />
        </AvatarWrapper>
        <TextWrapper>
          By: {author.firstName} {author.lastName}
        </TextWrapper>
        <Title>{title}</Title>
        <TextWrapper>{body}</TextWrapper>
      </FullPostWrapper>
    </PostWrapper>
  );
};
