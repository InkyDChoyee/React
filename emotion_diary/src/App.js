import "./App.css";
// 브라우저 url과 react app을 연결하는 기능
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 페이지들을 import 해준다
import Home from "./pages/Home.js"; // .js 생략 가능
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

import RouteTest from "./components/RouteTest.js";

function App() {
  return (
    // BrowserRouter로 감싸준다
    // = 감싸져있는 부분은 브라우저 url과 매핑될 수 있다
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          {/* 페이지 경로 매핑 */}
          {/* path="/"  == path="/index" */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          {/* :id = ':'을 사용하여 id라는 이름으로 값을 전달하겠다 라는 의미 */}
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
