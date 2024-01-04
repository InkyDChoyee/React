import DiaryItem from "./DiaryItem.js";

// onDelete함수를 사용하진 않지만 받아서
// onEdit prop까지 받아서 DiaryItem으로 전달
const DiaryList = ({ onEdit, onRemove, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>
      <div>
        {diaryList.map((it) => (
          // DiaryItem에게 보내주어야 한다
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

// error 방지
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
