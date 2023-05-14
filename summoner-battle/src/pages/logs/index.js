import React from 'react';
import { Link } from 'react-router-dom';
function Main() {
    return (
    <div className="App">
        <h1>전투기록</h1>
        <Link to="/">
          <button>뒤로가기</button>
        </Link>
    </div>
  );
}

export default Main;