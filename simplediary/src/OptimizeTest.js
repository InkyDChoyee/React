import React, { useEffect, useState } from "react";

// 자식 component 2개 생성
// const Textview = ({ text }) => {
//   useEffect(() => {
//     console.log(`update :: Text : ${text}`);
//   });
//   return <div>{text}</div>;
// };

// const CountView = ({ count }) => {
//   useEffect(() => {
//     console.log(`update :: Count : ${count}`);
//   });
//   return <div>{count}</div>;
// };
// 각 component의 값이 바뀔때 마다 모두 re-rendering 하게됨
// => 낭비 상황 발생

// 고차 component인 Reat.memo로 감싸준다
// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`update :: Count : ${count}`);
//   });
//   return <div>{count}</div>;
// });
// => text component의 값이 바뀌어도 re-rendering이 되지 않는다

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CountA Update - count : ${count}`);
  });
  return <div>{count}</div>;
});

// 객체인 obj를 prop으로 받는다
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CountB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

// areEqual함수를 사용하여 얕은 비교가 아닌
// 값을 비교하도록 해서 연산의 낭비를 하지 않도록 해줄 수 있다
const areEqual = (prevProps, nextProps) => {
  // 이전 props와 현재 props가 같은 경우 true를 반환
  // = re-rendering을 하지 않는다
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  // false인 경우 re-rendering을 일으킨다
  return false;

  // = 식 간단화 하기
  // = return prevProps.obj.count === nextProps.obj.count;
  // 한줄로 작성해도 같은 기능을 한다
};

// 새로운 component 생성
// areEqual는 React.memo의 비교함수로써 작용을 하게 된다
// CounterB는 areEqual의 판단에 따라 re-render를 할지 말지 결정하게 되는
// 메모화된 component가 된다
// MemoizedCounterB 로 고차원이 된 함수를 받는다
const MemoizedCounterB = React.memo(CounterB, areEqual);

// OptimizeTest component 생성
const OptimizeTest = () => {
  // 2개의 state 생성
  // const [count, setCount] = useState();
  // const [text, setText] = useState("");

  // count state 생성
  // state 의 값이 계속 1
  const [count, setCount] = useState(1);
  // object state 생성
  const [obj, setObj] = useState({
    // object state의 초기값으로 count=1이라는 property를 넣어준다
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      {/* <div>
        count를 handling 하겠다 
        <h2>count</h2>
         count를 prop으로 전달 
        <CountView count={count} />
        count를 + 1 해줄 버튼 생성 
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        {text handler 
        <h2>text</h2>
         text를 prop으로 전달 
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        {/* state 의 값이 계속 1이기 때문에 re-rendering되지 않음 */}
        <button onClick={() => setCount(count)}>A Button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: 1 })}>B Button</button>
      </div>
    </div>
  );
};

// component 내보내기
export default OptimizeTest;
