import './App.css';

import MyHeader from './MyHeader';

import React from "react";

function App() {

  let name = "이순신";

  return (
    // <div className="App">
    // <React.Fragment>
    <>
      <MyHeader />
      <header className="App-header">
        <h2>안녕 리액트 {name}</h2>
      </header>
    </>
    // </React.Fragment>
    // </div>
  );
}

export default App;
