import type { Post as PostType } from '@/lib/features/posts/postTypes';
import Link from 'next/link';

type PostProps = PostType & { shouldTruncate?: boolean; showLink?: boolean };

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

export const Post = ({
  shouldTruncate = false,
  showLink = false,
  title,
  body,
  id,
}: PostProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{shouldTruncate ? truncateText(body, 100) : body}</p>
      {showLink && (
        <Link style={{ display: 'block' }} href={`/post/${id}`}>
          Read more
        </Link>
      )}
    </div>
  );
};
