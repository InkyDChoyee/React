import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.js";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import React, { useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispathContext = React.createContext();

// 더미 데이터 생성
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의일기 1편",
    date: 1706149902776,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의일기 2편",
    date: 1706149902777,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의일기 3편",
    date: 1706149902778,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의일기 4편",
    date: 1706149902779,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의일기 5편",
    date: 1706149902780,
  },
];

function App() {
  // const [data, dispatch] = useReducer(reducer, []);
  // 더미 데이터 활용
  const [data, dispatch] = useReducer(reducer, dummyData);

  // date 값 구하기
  console.log(new Date().getTime());

  const dataId = useRef(0);
  const onCreate = (date, content, emotion) => {
    dispatch({
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
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispathContext.Provider value={{ onCreate, onEdit, onRemove }}>
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
      </DiaryDispathContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
