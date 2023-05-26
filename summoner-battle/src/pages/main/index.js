import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
function Main() {
    return (
        <div className="App">
      <header className="App-header">
        <Link to="/boss"><button>보스모드</button></Link>
        <Link to="/battle"><button>대전모드</button></Link>
        <Link to="/logs"><button>전투기록</button></Link>
      </header>
    </div>
  );
}

export default Main;