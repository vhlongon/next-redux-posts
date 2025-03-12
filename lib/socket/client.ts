export const getClient = () => {
  const ws = new WebSocket(
    `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${
      window.location.host
    }/api/ws`
  );
  return ws;
};
