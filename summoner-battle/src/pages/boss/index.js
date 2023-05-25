import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Battle } from '../../features/battle/Battle';
import { socket } from '../../socket';

function Main() {
  const [isSocketServerConnected, setIsSocketServerConnected] = useState(
    socket.connected
  );

  useEffect(() => {
    socket.on('connect', () => setIsSocketServerConnected(true));
    socket.on('disconnect', () => setIsSocketServerConnected(false));
    socket.on('hello', () => console.log('Hello! from Server'));
  }, []);

  return (
    <div className="App">
      <h1>보스모드</h1>

      <p>웹소켓 서버 연결 상태: {'' + isSocketServerConnected}</p>
      <button onClick={() => socket.connect()}>연결</button>
      <button onClick={() => socket.disconnect()}>해제</button>

      <Battle id="1" />
      <Battle id="2" />
      <Link to="/">
        <button>뒤로가기</button>
      </Link>
    </div>
  );
}

export default Main;
