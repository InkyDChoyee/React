import React, { useEffect, useState } from "react";

// LifeCycle Component의 자식 component인 UnMountTest component 생성
// LifeCycle의 isVisible의 값이 true일때만 UnMount component가 화면에 rendering됨
const UnMountTest = () => {
  useEffect(() => {
    console.log("Sub Component Mount");
    return () => {
      // UnMount되는 시점에 실행되는 함수 를 return 시킴
      console.log("Sub Component Unmount");
    };
  }, []);
  return <div>UN MOUNT TEST</div>;
};

// LifeCycle Component
const LifeCycle = () => {
  // count에 사용될 state
  const [count, setCount] = useState(0);
  // input에 사용될 state
  const [text, setText] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  // Mount되는 시점을 제어
  useEffect(() => {
    // component가 Mount되는 시점에 console이 수행된다
    console.log("Mount!"); // = Callback 함수
  }, []);

  useEffect(() => {
    console.log("Update!");
  });

  useEffect(() => {
    console.log(`count is update : ${count}`);
    // if (count > 5) {
    //   alert("count가 5를 넘었습니다, 따라서 1로 초기화합니다");
    //   setCount(1);
    // }
  }, [count]); // Dependency Array의 값이 바뀌게 되면 callback함수가 다시 호출이된다

  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]);
  // Dependency에 따라 감지하고 싶은것의 변화만 감지

  return (
    <div>
      {/* 위에서 생성한 state 사용 */}
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>count up</button>
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button onClick={toggle}>ON/OFF BUTTON</button>
      {/* && = 단락회로평가를 이용하여 isVisible의 boolean 값에 따라
            UnMountTest의 render 여부가 달라진다  */}
      {isVisible && <UnMountTest />}
    </div>
  );
};

export default LifeCycle;
