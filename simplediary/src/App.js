import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  createContext,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

// data state를 전역적으로 공급할 수 있도록 도와줄
// DiaryStateContext 생성
// 다른 component들이 Context에 접근을 해서
// 사용하고 싶은 data를 받아갈 수 있도록 export를 해주어야 한다
// export default는 파일 하나당 하나밖에 쓸 수 없기 때문에
// 그냥 export만 해준다
export const DiaryStateContext = createContext(null);
// 새로운 Context를 하나 더 생성해준다
export const DiaryDispatchContext = createContext(null);

// 1. 공급자 = Context가 가지고 있는 Provider component를 사용

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent,
            }
          : it
      );
    }
    default:
      return state;
  }
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  const getData = async () => {
    setTimeout(async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      ).then((res) => res.json());

      const initData = res.slice(0, 20).map((it) => {
        return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++,
        };
      });

      dispatch({ type: "INIT", data: initData });
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent,
    });
  }, []);

  // 전달해 주어야 할 함수들을 하나의 값으로 묶어서 prop으로 전달
  // useMemo()를 활용하여 묶는다 = App component가 재생성 될 때 객체의 재생성을 방지
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []); // 재생성 되는 일이 없도록 deps를 빈 배열로 전달한다

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    // 2. App component가 return하고 있는 부분의 최상위 태그를 바꿔준다
    // = 공급자 component로 wrapping
    // 3. value라는 prop으로 data, 공급을 내려주어야 한다
    // = Provider component에 내려준 값은 언제든지 가져다 쓸 수 있는 값이다
    <DiaryStateContext.Provider value={data}>
      {/* = state Context Provider */}
      {/* DiaryStateContext.Provider의 자식 요소로 추가해준다 */}
      {/*  */}
      <DiaryDispatchContext.Provider value={memoizedDispatch}>
        {/* = dispatch Context Provider */}
        <div className="App">
          {/* DiaryEditor는 더이상 onCreate를 전달 받을 필요가 없어진다 */}
          {/* <DiaryEditor onCreate={onCreat}/> */}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          {/* App component에서는 더이상 DiaryList component에게 
              diaryList라는 값을 prop으로 전달해 줄 필요가 없다 
              Cntext로부터 값을 뽑아오기 때문이다 */}
          {/* <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} */}
          {/* DiaryList도 dispatch 함수들을 전달받을 필요가 없어진다 */}
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
