'use client';

import { validatePostWithAuthor } from '@/lib/features/posts/postsValidation';
import { getClient } from '@/lib/socket/client';
import type { FormEventHandler } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 300px;
`;

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
    <Form onSubmit={sendMessage}>
      <InputWrapper>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" placeholder="Title" />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="body">Body:</label>
        <input type="text" id="body" name="body" placeholder="Body" />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
        />
      </InputWrapper>
      <button type="submit">Add Post</button>
    </Form>
  );
};
