// useEffect를 import해줌
import React, { useEffect, useRef, useState } from "react";

// onCreate를 prop으로 전달받는다
// React.memo()를 이용하여 component최적화를 해준다
// onCreate 함수가 재생성되지 않아야만 DiaryEditor component를
// React.memo()와 함께 최적화 할수 있다
const DiaryEditor = ({ onCreate }) => {
  console.log("DiaryEditor 렌더");
  // 상수에 함수 호출의 반환값을 저장, 담기
  // dom요소에 접근할 수 있도록 해주는 reference객체를 상수에 담기
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //alert("작성자는 최소 1글자 이상 입력해주세요");
      // 요즘 트렌드는 alert를 띄우기보다 focus를 준다

      // dom요소를 선택하는 상수의 현재 가르키는 값을 current property로 불러와서 사용 가능
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      //alert("일기 본문은 최소 5글자 이상 입력해주세요");
      contentInput.current.focus();
      return;
    }

    // console.log(state);

    // prop으로 받은 onCreate 함수를 호출한다
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");

    // 일기를 저장했다면
    // 일기 작성 form의 data를 초기화 해준다
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          // ref= 으로 맵핑
          ref={authorInput}
          value={state.author}
          onChange={handleChangeState}
          name="author"
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          value={state.content}
          onChange={handleChangeState}
          name="content"
          placeholder="일기"
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);
