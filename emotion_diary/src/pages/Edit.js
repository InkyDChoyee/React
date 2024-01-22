import { useSearchParams } from "react-router-dom";

const Edit = () => {
  // Query String 꺼내서 사용하기 = 비구조화 할당으로 사용
  // useSearchParams() = query string을 처리하는 custom hook
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id: ", id);

  const mode = searchParams.get("mode");
  console.log("mode: ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이 곳은 일기 수정 페이지입니다</p>
      {/* setSearchParams를 바꾸는 버튼(객체를 전달한다) */}
      <button onClick={() => setSearchParams({ who: "name" })}>
        QS 바꾸기
      </button>
    </div>
  );
};

export default Edit;
