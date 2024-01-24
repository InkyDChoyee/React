import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.js";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import { useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      // const newItem = {
      //   // reducer에서 받는 action 객체에서는
      //   // spread 연산자를 이용하여 newItem 생성
      //   ...action.data,
      // };
      // newState = [newItem, ...state];
      // newItem 대신 action.data를 직접 넣어줌
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      // targetId를 필터링 한 나머지 요소들을 배열로 만들어서 newState를 바꾼다
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        // 전달된 action.data의 id가 일치하는 요소를 찾아내서
        // 그 일치하는 요소에 action.data를 전달하도록 한다
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  // dispatch 함수 만들기
  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    // 시간, 내용, 감정 -> 데이터로 전달
    dispatch({
      // 이런식으로 데이터 전달
      type: "CREATE",
      date: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "Remove",
      targetId,
    });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      date: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
