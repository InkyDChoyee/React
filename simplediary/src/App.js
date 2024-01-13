import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
//  useReducer import
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

// 2. 첫번째 파라미터로 상태 변화가 일어나기 직전의 state를 받고,
// 두번째 파라미터로는 어떤 상태변화를 일으켜야 하는지에 대한
// 정보들이 담겨져 있는 action 객체를 받는다
const reducer = (state, action) => {
  // action객체에 담겨져 있는 type property를 통해
  // switch-case를 이용해서 상태 변화를 처리한다
  // reducer가 return하는 값이 새로운 상태의 값이 된다
  switch (action.type) {
    // 4-1. action INIT case를 만들어줌
    case "INIT": {
      // 6-1. data: initData를 data로 받아 반환시켜준다
      // data를 초기화 하는 INIT case 완성
      return action.data;
    }
    // 4-2. CREATE
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    // 4-3. REMOVE
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    // 4-4. EDIT
    // EDIT type의 action이 발생하면 targetId와 newContent를 전달받아

    case "EDIT": {
      // 기존 state에 map()함수를 사용하여
      // targetId와 일치하는 요소를 찾아준 다음
      // 그 요소의 값은 content만 newContent로 수정을 해주고
      // 나머지 요소는 그대로 돌려준다
      // 그 요소들을 합쳐 새로운 배열을 만들어 새로운 state로 보내준다
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent,
            }
          : it
      );
    }
    // 4-5 switch-case문 = default case 필수
    default:
      // 상태를 변화하지 않고 그대로 반환
      return state;
  }
};

const App = () => {
  // useState()는 주석처리
  // App component의 일기 data state를 => useState Hooks가 아닌 useReducer Hooks로 관리한다
  // const [data, setData] = useState([]);
  // 5. setData가 했던 역할을 dispatch와 reducer에게 나눠준다

  const [data, dispatch] = useReducer(reducer, []); // 인자로 reducer와 data state의 초기값을 넣어준다
  // 1. ueseReducer를 사용하는 이유에 따라 App component 밖에 reducer 함수를 만들어준다
  // 3. data state에 어떠한 action들이 필요한지 살펴본다

  const dataId = useRef(0);

  // 3-1. getData() = init data를 api call을 통해
  // 적절히 가공해서 한방에 data를 초기화하는 기능을 담당
  // => action = INIT이라고 정의
  const getData = async () => {
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

    // setDate(initData);
    // 5-1. setDate 대신 dipatch를 사용하여 작업
    // 데이터를 초기화 하는 작업을 하겠다는 의미
    // aciton에 필요한 데이터는 initData가 된다
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  // 3-2. onCreate()
  const onCreate = useCallback((author, content, emotion) => {
    // const created_dat = new Date().getTime();
    // const newItem = { author, content, emotion, id: dataId.current };
    // 5-2. dispatch를 통해 CREATE action을 하도록 만듬
    dispatch({
      type: "CREATE",
      // newItem에 있는 property를 그대로 가져다 사용함
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
    // setData((data) => [newItem, ...dat]);
  }, []);

  // 3-3. onRemove()
  const onRemove = useCallback((targetId) => {
    // setData((data) => data.filter((it) => it.id !== targerId));
    dispatch({ type: "REMOVE", targetId });
  }, []);

  // 3-4. onEdit
  const onEdit = useCallback((targetId, newContent) => {
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
    dispatch({
      type: "EDIT",
      targetId,
      newContent,
    });
  }, []);
  // 3. data를 조작하는 기능을 가진 함수 끝

  const memoizedDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = memoizedDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
};

export default App;
