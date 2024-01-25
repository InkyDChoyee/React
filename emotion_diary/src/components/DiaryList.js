// DiaryList 생성
const DiaryList = ({ diaryList }) => {
  // prop으로 전달받은 diaryList를 map()으로 list rendering
  return (
    <div>
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};
// DiaryList가 제대로 보내지지 않을 경우 대비
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
