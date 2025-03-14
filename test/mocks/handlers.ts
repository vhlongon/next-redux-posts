import { http, HttpResponse, ws } from 'msw';
import { mockedPostWithAuthor, mockedPosts, mockedUser } from './postMock';

const wsCLient = ws.link('ws://localhost:3000/api/ws');

export const handlers = [
  http.get('https://dummyjson.com/posts', () => {
    return HttpResponse.json({
      posts: mockedPosts,
      total: mockedPosts.length,
      skip: 0,
      limit: mockedPosts.length
    });
  }),
  http.get('https://dummyjson.com/posts/:id', () => {
    return HttpResponse.json(mockedPostWithAuthor);
  }),
  http.get('https://dummyjson.com/users/:id', () => {
    return HttpResponse.json(mockedUser);
  }),
  wsCLient.addEventListener('connection', ({ client }) => {
    console.log('[MSW] Mocking outgoing WebSocket connection via msw');
    client.addEventListener('message', (event) => {
      console.log('[MSW] from client:', event.data);
    });
  })
];
