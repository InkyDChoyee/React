import { useState } from "react";

const DiaryEditor = () => {
  // 각 input의 공통된 state 묶어서 기본값 할당해주기
  const [state, setState] = useState({
    // 기본값 할당
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    // eventHandler 합치기
    setState({
      // spread연산자 사용 => state객체가 가지고 있은 property 들을 펼쳐준다
      // 기본적으로 원래의 값을 객체에 할당해줄 수 있다
      ...state,
      [e.target.name]: e.target.value, // 괄호표기법
      // spread연산자와 값을 바꾸고싶은 property의 순서를 꼭 지켜주어야
      // 값이 원래의 값으로 덧씌워지지 않는다
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장 성공!");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          value={state.author}
          onChange={handleChangeState}
          name="author"
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
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
export default DiaryEditor;
