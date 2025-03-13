import { http, HttpResponse, ws } from 'msw';
import { mockedPosts } from './postMock';

const wsCLient = ws.link('ws://localhost:3000/api/ws');

export const handlers = [
  http.get('https://dummyjson.com/posts', () => {
    return HttpResponse.json({
      posts: mockedPosts,
      total: mockedPosts.length,
      skip: 0,
      limit: mockedPosts.length,
    });
  }),
  wsCLient.addEventListener('connection', () => {
    console.log('Mocking outgoing WebSocket connection via msw');
  }),
];
