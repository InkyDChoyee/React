import "./App.css";
// import React, { useState, useEffect } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  // 예시로 만드는 일기 데이터
  {
    id: 1,
    author: "이순신",
    content: "난중일기",
    emotion: 5,
    create_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "김시민",
    content: "진주성",
    emotion: 1,
    create_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "권율",
    content: "행주",
    emotion: 3,
    create_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "유성룡",
    content: "한양",
    emotion: 2,
    create_date: new Date().getTime(),
  },
];

const App = () => {
  const [data, setData] = useState([]);

  // useRef()를 사용하여 Id를 0번 idx부터 시작해서
  // 차례로 부여할 수 있게 해줌
  const dataId = useRef(0);

  // 새로운 일기를 추가할 수 있는 함수
  const onCreate = (author, content, emotion) => {
    // 현재 시간
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    // Id를 증가시켜 순서대로 될 수 있도록 해줌
    dataId.current += 1;
    // newItem을 기존 데이터 앞에 오게 함으로써
    // 제일 최근 일기가 제일 위쪽으로 오게 해준다
    setData([newItem, ...data]);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default App;
