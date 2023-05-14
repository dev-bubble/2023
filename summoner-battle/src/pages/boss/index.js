import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Battle } from '../../features/battle/Battle';
function Main() {
    return (
    <div className="App">
      <h1>보스모드</h1>
      <Battle/>
      <Link to="/">
          <button>뒤로가기</button>
      </Link>
    </div>
  );
}

export default Main;