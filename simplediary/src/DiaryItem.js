// diaryItem component 생성

import { useRef, useState } from "react";

// onDelete를 prop으로 받아준다
// DiaryList에서 내려준 onEdit함수 prop을 받아서 호출해주면 된다
const DiaryItem = ({
  onRemove,
  onEdit,
  author,
  content,
  emotion,
  id,
  create_date,
}) => {
  // 수정하기 버튼을 눌렀을 때 나오는 수정 폼 => status로 만들기
  // isEdit = boolean 값으로 수정 중인지 아닌지를 판단
  const [isEdit, setIsEdit] = useState(false);
  // isEdit의 값을 반대로 바꾸는 반전연산 함수
  // true 값이라면 수정중으로 간주해서 수정 폼을 띄우도록 한다
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //
  const localContentInput = useRef();

  // textarea의 input을 handling할 status 생성
  // useState(content) localContent의 기본값을 원래의 content값으로 설정해서
  // 수정하기 버튼을 누르면 원래의 내용을 불러올 수 있도록 해준다
  const [localContent, setLocalContent] = useState(content);

  // 밖으로 뺀 onClick의 함수를 새로 정의해줌
  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // 수정폼 내용 자체를 원래의 내용으로 초기화 해주는 함수
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // 수정완료 버튼을 눌렀을 때의 event를 처리할 함수
  const handleEdit = () => {
    // 5자 이상 입력하도록
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    // 확인받기
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      // 수정이 완료되었기 때문에 토글을 한번더 실행해서 상태를 종료해준다
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {/* 3항 연산자를 사용하여 isEdit의 상태에 따라 표시를 다르게 해줌 */}
        {isEdit ? (
          <textarea
            ref={localContentInput}
            // 값을 localContent에 mapping
            value={localContent}
            // onChange event handler에는 e event 객체를 받아서
            // 적힌 값을 localContent에 mapping 시켜서 사용할 수 있게 만들어준다
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {/* 버튼의 onClick 함수가 길어서 밖으로 빼줌 */}
      {/* 수정하기가 활성중일 때 버튼도 따라서 달라짐 */}
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleClickRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
