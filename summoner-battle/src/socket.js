import { io } from 'socket.io-client';

const LOCAL_SOCKET_SERVER_PORT = 4000;

// "undefined"는 URL이 window.location 객체로부터 생성될 것임을 의미한다.
const URL =
  process.env.NODE_ENV === 'production'
    ? undefined
    : `http://localhost:${LOCAL_SOCKET_SERVER_PORT}`;

// 개발 환경에서는 서버에서 CORS 활성화해줄 것
export const socket = io(URL, {
  autoConnect: false,
});
