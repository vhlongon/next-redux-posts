'use client';

import { PostWithAuthor } from '@/lib/features/posts/postTypes';
import Link from 'next/link';

type PostProps = PostWithAuthor & {
  preview?: boolean;
  isNew?: boolean;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

export const Post = ({
  preview = false,
  title,
  body,
  id,
  author,
  isNew = false,
}: PostProps) => {
  return (
    <article
      className={isNew ? 'highlighted' : ''}
      style={{
        padding: '20px',
        border: '1px solid #eaeaea',
        borderRadius: '8px',
        backgroundColor: 'transparent',
      }}
    >
      <style jsx>{`
        .highlighted {
          animation: fadeInAndOut 3.5s ease-out forwards;
        }

        @keyframes fadeInAndOut {
          0% {
            background-color: transparent;
          }
          25% {
            background-color: #fff3cd;
          }
          85% {
            background-color: #fff3cd;
          }
          100% {
            background-color: transparent;
          }
        }
      `}</style>
      <h2>{preview ? <Link href={`/posts/${id}`}>{title}</Link> : title}</h2>
      <p>{preview ? truncateText(body, 100) : body}</p>
      <p>
        By: {author.firstName} {author.lastName}
      </p>
      {preview && (
        <Link style={{ display: 'block' }} href={`/post/${id}`}>
          Read more
        </Link>
      )}
    </article>
  );
};
