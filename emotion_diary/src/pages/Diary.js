import { useParams } from "react-router-dom"; // = custom hooks의 하나

const Diary = () => {
  // id로 정의된 path variable을 id로 꺼내온다
  // useParams() = id로 전달된 path variable을 모아서 객체로 전달하는 기능을 함
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이 곳은 일기 상세 페이지입니다</p>
    </div>
  );
};

export default Diary;
