// import './App.css';

import MyHeader from './MyHeader';

import React from "react";

function App() {
  let name = "이순신";

  const style = {
    App : {
      backgroundColor:'black'
    },
    h2 : {
      color:'red'
    },
    bold_text : {
      color:'green'
    },
  };

  const func = () => {
    return "func";
  }

  const number = 5;

  return (
    <div style={style.App}>
      <MyHeader />
        <h2 style={style.h2}>안녕 리액트</h2>
        <b style={style.bold_text}>
          {number}는 : {number % 2 === 0 ? "짝수" : "홀수"}
        </b>
    </div>
  );
}

export default App;
