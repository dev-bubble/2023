import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function Main() {
  return (
    <div className="App">
      <h1>대전모드</h1>
      <Link to="/">
        <button>뒤로가기</button>
      </Link>
    </div>
  );
}

export default Main;
