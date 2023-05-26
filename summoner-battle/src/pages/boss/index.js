import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Boss } from '../../features/boss/Boss';
import { socket } from '../../socket';
import { useDispatch } from 'react-redux';

import { attackToBoss } from '../../features/battle/battleSlice';

function Main() {
  const dispatch = useDispatch();

  const [isSocketServerConnected, setIsSocketServerConnected] = useState(
    socket.connected
  );

  useEffect(() => {
    socket.on('connect', () => setIsSocketServerConnected(true));
    socket.on('disconnect', () => setIsSocketServerConnected(false));

    socket.on('hello', () => console.log('Hello! from Server'));

    socket.on('player', (args) => {
      const { 속성, 등급 } = args;
      if (!(속성 && 등급)) return;
      console.log(`소환 정보 - 속성: ${속성} / 등급: ${등급}`);
      dispatch(
        attackToBoss({
          isThreeStar: 등급 === '3성',
          isFourStar: 등급 === '4성',
          isFiveStar: 등급 === '5성',
          element: 속성,
        })
      );
    });
  }, [dispatch]);

  return (
    <div className="App">
      <h1>보스모드</h1>
      <div className="fix-at-top">
        <p>웹소켓 서버 연결 상태  <i className={`fa-solid fa-power-off ${isSocketServerConnected}`} /></p>
        <button onClick={() => socket.connect()}>연결</button>
        <button onClick={() => socket.disconnect()}>해제</button>
      </div>

      <Boss />
      <Link to="/">
        <button>뒤로가기</button>
      </Link>
    </div>
  );
}

export default Main;
