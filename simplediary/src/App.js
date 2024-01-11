import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// import OptimizeTest from "./OptimizeTest";
// import LifeCycle from "./LifeCycle";

const App = () => {
  // 처음 시작할 때의 data state배열은 빈 값
  const [data, setData] = useState([]);

  // useRef()를 사용하여 Id를 0번 idx부터 시작해서
  // 차례로 부여할 수 있게 해줌
  const dataId = useRef(0);

  // asunc()를 사용하여 geData가 promise를 반환하도록 비동기 함수로 만들어줌
  // getData() 생성
  // data를 받아오면서 re-render가 일어남 -> 내부의 모든 함수들이 재생성, 실행
  const getData = async () => {
    // 원하는 json 값들만 가져오기
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    // 가져온 json값의 요소들을 각 일기의 데이터 기초값으로 활용
    // slice()를 활용하여 20개만 추려냄
    // map()함수를 활용하여 데이터를 순회하면서 새로운 배열로 return하도록 해줌
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        // Math객채의 random()함수를 이용하여 무작위로 emotion 점수 부여
        // floor()함수를 이용하여 소수점을 버리고 정수로 만들어 줌
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        // 현재의 id값을 넣고나서 id값 1 증가
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  // Mount 시점에 수행할 함수 호출
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  // 새로운 일기를 추가할 수 있는 함수
  // useCallback() 으로 onCreate함수를 감싸준다
  const onCreate = useCallback(
    (author, content, emotion) => {
      // 현재 시간
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current,
      };
      // Id를 증가시켜 순서대로 될 수 있도록 해줌
      dataId.current += 1;
      // newItem을 기존 데이터 앞에 오게 함으로써
      // 제일 최근 일기가 제일 위쪽으로 오게 해준다
      // setData([newItem, ...data]); // => 빈배열에 newItem 딱 하나만 추가한것처럼 되어버림
      setData((data) => [newItem, ...data]); // => state 변화 함수에 함수를 전달하는 것 = 함수형 업데이트라고 한다
    },
    // useCallback을 활용하면서 [] depency array에 아무값도 넣어주지 않아서
    // 추가된 데이터만 나오고 기존의 데이터가 날아가 버린다
    // onCreate 함수는 component가 mount되는 시점에 한번만 생성이 되기 때문에
    // 그 당시의 data state의 값이 [] 빈배열이기 때문에
    // onCreate 함수가 마지막으로 생성됐을 때의 state가 빈배열이기 때문에 이런 현상이 발생
    // []

    // [data]
    // onCreate가 재생성 되지 안도록 해주기 위해서 useCallback을 쓰는데
    // data 값이 변경되면 onCreate 함수가 재생성 되고,
    // 최신의 데이터를 받아오기 위해서는 onCreate가 최신의data 값을 가져와야 한다

    // 위에서 함수형 업데이트를 해줌으로써
    [] // 빈 배열을 인자로 사용하더라도 setData()의 인자에서
    // 최신의 데이터를 참고 할수 있게 되어서 []를 비워놓아도 괜찮도록 해준다
  );

  // app conponent에 onDelete 함수 생성
  const onRemove = useCallback((targetId) => {
    // targetId를 제외한 나머지 id를 가진 배열의 요소들만으로 다시 배열 생성
    // 데이터를 다루는 부분을 잘라내기 해서
    //const newDiaryList = data.filter((it) => it.id !== targetId);
    // 새로운 배열로 리스트를 전달해준다
    // 데이터를 전달해서 return하는 방식으로 바꿔준다
    setData((data) => data.filter((it) => it.id !== targetId));
    // setData함수에 전달되는 파라미터data에 최신 state가 전달되는 것이기 때문에
    // 항상 최신 state를 이용하기 위해서는 함수형update의 인자부분의 data를 사용해야 한다
    // return부분의 data를 사용해야 최신형 update를 활용할 수 있다
  }, []);

  // 수정할 targetId, newContent 두개의 매개변수를 받아온다
  const onEdit = useCallback((targetId, newContent) => {
    // setData 함수를 호추하고 map()함수를 적용해서
    // 일치하는 아이디를 찾아 해당 원소가 수정되도록 해준다
    setData((data) =>
      data.map((it) =>
        // 일치하는 경우 content를 newContent 로 수정, 일치하지 않으면 그냥 it
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  // 최적화 함수
  // => getDiaryAnalysis에 useMemo()함수를 활용하여
  // return을 갖는 함수를 Memoization할 수 있다
  const getDiaryAnalysis = useMemo(
    // useMemo()함수로 Memoization하고싶은 함수의 코드를 감싸준다
    // getDiaryAnalysis가 useMemo()함수를 호출한 결과값 처럼 바뀜
    // 첫번째 인자로 callback함수를 호출하는 형태가 된다
    () => {
      if (data.length === 0) {
        return { goodcount: 0, badCount: 0, goodRatio: 0 };
      }
      // console.log("일기 분석 시작");
      // 감정 점수에 따른 일기 분류
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100.0;
      return { goodCount, badCount, goodRatio };
    },
    // getDiaryAnalysis함수를 호출한다고 하더라도
    // 두번째 인자인 [data.length]가 변화하지 않는 이상
    // 똑같은 return을 계산하지 않고 반환한다
    [data.length]
    // dependency array에 어떤 값이 변화할 때만 이 연산을 다시 수행 하도록 명시하게 되면
    // 함수를 값처럼 사용을 해서 연산 최적화를 할 수 있다
  );

  // re-rendering이 될 때 다시한번 실행이 된다
  // useMemo()를 활용하여 함수를 최적화하게 되면 그 함수는 더이상 함수가 아니게 된다
  // useMemo()가 callback함수의 return 값을 return하기 때문에
  // getDiaryAnalysis는 useMemo로부터 값만을 return 받게 된다
  // 그렇기 때문에 함수가 아닌 값으로써 사용하게 된다
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //getDiaryAnalysis() X

  return (
    <div className="App">
      {/* 가장 상단에 OptimizeTest rendering */}
      {/* <OptimizeTest /> */}

      {/* LifeCycle component rendering => import */}
      {/* <LifeCycle /> */}
      <DiaryEditor onCreate={onCreate} />

      {/* 받은 데이터 rendering */}
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>

      {/* DiaryList로 onRemove함수를 내려줌 */}
      {/* DiaryItem의 부모인 DiaryList로 onEdit함수를 보내준다 */}
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
