import { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import LifeCycle from "./LifeCycle";

const App = () => {
  const [data, setData] = useState([]);

  // useRef()를 사용하여 Id를 0번 idx부터 시작해서
  // 차례로 부여할 수 있게 해줌
  const dataId = useRef(0);

  // asunc()를 사용하여 geData가 promise를 반환하도록 비동기 함수로 만들어줌
  // getData() 생성
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
  const onCreate = (author, content, emotion) => {
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
    setData([newItem, ...data]);
  };

  // app conponent에 onDelete 함수 생성
  const onRemove = (targetId) => {
    // targetId를 제외한 나머지 id를 가진 배열의 요소들만으로 다시 배열 생성
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // 새로운 배열로 리스트를 전달해준다
    setData(newDiaryList);
  };

  // 수정할 targetId, newContent 두개의 매개변수를 받아온다
  const onEdit = (targetId, newContent) => {
    // setData 함수를 호추하고 map()함수를 적용해서
    // 일치하는 아이디를 찾아 해당 원소가 수정되도록 해준다
    setData(
      data.map((it) =>
        // 일치하는 경우 content를 newContent 로 수정, 일치하지 않으면 그냥 it
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* LifeCycle component rendering => import */}
      {/* <LifeCycle /> */}
      <DiaryEditor onCreate={onCreate} />

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
