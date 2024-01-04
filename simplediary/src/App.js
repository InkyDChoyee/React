import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// const dummyList = [
//   // 예시로 만드는 일기 데이터
//   {
//     id: 1,
//     author: "이순신",
//     content: "난중일기",
//     emotion: 5,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "김시민",
//     content: "진주성",
//     emotion: 1,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "권율",
//     content: "행주",
//     emotion: 3,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "유성룡",
//     content: "한양",
//     emotion: 2,
//     create_date: new Date().getTime(),
//   },
// ];

const App = () => {
  const [data, setData] = useState([]);

  // useRef()를 사용하여 Id를 0번 idx부터 시작해서
  // 차례로 부여할 수 있게 해줌
  const dataId = useRef(0);

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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      {/* DiaryList로 onDelete함수를 내려줌 */}
      {/* DiaryItem의 부모인 DiaryList로 onEdit함수를 보내준다 */}
      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    </div>
  );
};

export default App;
