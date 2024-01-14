import DiaryItem from "./DiaryItem";
import { useContext } from "react";
import { DiaryStateContext } from "./App";

// diaryList = App component의 data state값
// context에서 공급을 받으면 되기 때문에
// App component의 data 값을 prop으로 받을 필요가 없어짐
// DiaryDispatchContext 에서 onEdit, onRemove를 가져오므로 prop으로 받아 올 필요X
// const DiaryList = ({ onEdit, onRemove, diaryList }) => {
const DiaryList = () => {
  // useContext라는 hook을 사용하여 diaryList를 꺼내온다
  // DiaryStateContext를 인자로 받아온다 (값을 꺼내오고 싶은 Context를 인자로 받음)
  // Chrome의 React Developer Tools의 Components tap에서
  // hooks 부분의 Context가 값을 받아오는 것을 확인할 수 있다
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          // DiaryItem에게 전달하는 props drilling도 제거를 해준다
          // <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
