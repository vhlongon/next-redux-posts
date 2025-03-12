'use client';

import { validatePostWithAuthor } from '@/lib/features/posts/postsValidation';
import { getClient } from '@/lib/socket/client';
import { FormEventHandler } from 'react';

export const AddPostForm = () => {
  const sendMessage: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const ws = getClient();

    const formData = new FormData(e.currentTarget);
    const post = Object.fromEntries(formData);

    const postWithAuthor = {
      ...post,
      id: Date.now(),
      userId: 123,
      author: {
        id: 1,
        firstName: post['firstName'],
        lastName: post['lastName'],
      },
    };

    const payload = validatePostWithAuthor(postWithAuthor);

    ws.onopen = () => {
      ws.send(JSON.stringify(payload));
      ws.close();
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };
  };

  return (
    <form onSubmit={sendMessage}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="body" placeholder="Body" />
      <input type="text" name="firstName" placeholder="First Name" />
      <input type="text" name="lastName" placeholder="Last Name" />
      <button type="submit">Add Post</button>
    </form>
  );
};
