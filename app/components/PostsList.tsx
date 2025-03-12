'use client';

import { PostsWithAuthorResponse } from '@/lib/features/posts/postTypes';
import { useLoadInfinitePosts } from '@/lib/hooks/useLoadInfinitePosts';
import { Post } from './Post';
import type { MouseEventHandler } from 'react';

type PostsProps = {
  initialData: PostsWithAuthorResponse;
};

export const PostsList = ({ initialData }: PostsProps) => {
  const { posts, ref, error, isFetching, isLoading } =
    useLoadInfinitePosts(initialData);
  const attachLoadAnchor = !isLoading && !isFetching;

  const sendMessage: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    //TODO: move this to a hook
    // Send a test post through the WebSocket
    const ws = new WebSocket(
      `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${
        window.location.host
      }/api/ws`
    );
    ws.onopen = () => {
      const newPost = {
        id: Date.now(), // Use timestamp to ensure unique ID
        title: 'Sample Post Title',
        body: 'This is the content of the post',
        tags: ['test', 'sample'],
        userId: 1,
        author: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
        },
      };
      ws.send(JSON.stringify(newPost));
      ws.close();
    };
  };

  return (
    <>
      <button onClick={sendMessage}>add post</button>
      <ul style={{ marginBottom: '100px' }}>
        {posts?.map(post => (
          <li
            key={`post-${post.id}`}
            style={{
              paddingBottom: '50px',
              listStyle: 'none',
            }}
          >
            <Post {...post} preview />
          </li>
        ))}
      </ul>
      {error && <div>{error.message}</div>}
      {isFetching && <p style={{ padding: '100px' }}>Loading more posts...</p>}
      {attachLoadAnchor && (
        <div style={{ height: '100px', padding: '100px' }} ref={ref} />
      )}
    </>
  );
};
