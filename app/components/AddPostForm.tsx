'use client';

import { validatePostWithAuthor } from '@/lib/features/posts/postsValidation';
import { getClient } from '@/lib/socket/client';
import type { FormEventHandler } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 300px;
`;

const Button = styled.button`
  width: fit-content;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const AddPostForm = () => {
  const sendMessage: FormEventHandler<HTMLFormElement> = (e) => {
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
        firstName: post.firstName,
        lastName: post.lastName
      }
    };

    const payload = validatePostWithAuthor(postWithAuthor);

    ws.onopen = () => {
      console.info('Sending message to server');
      ws.send(JSON.stringify(payload));
      ws.close();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  return (
    <Form onSubmit={sendMessage} aria-label="Add Post Form">
      <InputWrapper>
        <label htmlFor="title">Title:</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          maxLength={75}
          minLength={10}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="body">Body:</label>
        <textarea
          required
          id="body"
          rows={10}
          name="body"
          placeholder="Body"
          maxLength={1000}
          minLength={25}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="firstName">First Name:</label>
        <input
          required
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          maxLength={20}
          minLength={2}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="lastName">Last Name:</label>
        <input
          required
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          maxLength={20}
          minLength={2}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button type="submit">Add Post</Button>
      </ButtonWrapper>
    </Form>
  );
};
