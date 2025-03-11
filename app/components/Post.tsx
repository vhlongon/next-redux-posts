import type { PostWithAuthor } from '@/lib/features/posts/postTypes';
import Link from 'next/link';

type PostProps = PostWithAuthor & {
  preview?: boolean;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

export const Post = ({
  preview = false,
  title,
  body,
  id,
  author,
}: PostProps) => {
  console.log('🚀 ~ preview:', preview);
  return (
    <div>
      <h1>{title}</h1>
      <p>{preview ? truncateText(body, 100) : body}</p>
      <p>
        By {author.firstName} {author.lastName}
      </p>
      {preview && (
        <Link style={{ display: 'block' }} href={`/post/${id}`}>
          Read more
        </Link>
      )}
    </div>
  );
};
