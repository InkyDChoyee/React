import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // Query String 꺼내서 사용하기 = 비구조화 할당으로 사용
  // useSearchParams() = query string을 처리하는 custom hook
  const [searchParams, setSearchParams] = useSearchParams();

  // useNavigate hook = 페이지를 이동시킬 수 있는 기능을 하는 함수 하나를 반환
  // 그 함수의 이름을 navigate로 받음
  const navigate = useNavigate();

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
      <button
        onClick={() => {
          // navigate의 인자로 경로를 작성하면
          // navigate 함수를 호출해서 경로를 옮겨줄 수 있다
          navigate("/home");
        }}
      ></button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
