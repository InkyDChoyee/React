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

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CountB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

// OptimizeTest component 생성
const OptimizeTest = () => {
  // 2개의 state 생성
  // const [count, setCount] = useState();
  // const [text, setText] = useState("");

  // count state 생성
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
