'use client';

import type { Post as PostType } from '@/lib/features/posts/postsValidation';
import { useState } from 'react';

type PostProps = PostType & { shouldTruncate?: boolean; showLink?: boolean };

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

const PostBody = ({ body, shouldTruncate }: PostProps) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleTruncate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsTruncated(current => !current);
  };

  if (shouldTruncate) {
    const content = isTruncated ? truncateText(body, 100) : body;
    const buttonText = isTruncated ? 'Show more' : 'Show less';

    return (
      <>
        <p>{content}</p>
        <button onClick={handleTruncate}>{buttonText}</button>
      </>
    );
  }
  return <p>{body}</p>;
};

export const Post = (props: PostProps) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <PostBody {...props} />
      {props.showLink && <a href={`/post/${props.id}`}>Read more</a>}
    </div>
  );
};
