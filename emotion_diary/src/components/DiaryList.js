import { useState } from "react";

// <select>태그 안에 들어갈 option 생성 => prop으로 전달
const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

// <select>태그를 이용하여 controll 메뉴를 만들어줌
// value, onChange, optionList 를 prop으로 내려줌
const ControlMenu = ({ value, onChange, optionList }) => {
  // value = select menu가 어떤걸 선택하고 있는지의 역할
  // onChange = select가 선택하는 것이 변화했을 때 바꿀 함수 기능
  // optionList = <select>안에 들어갈 옵션
  return (
    // select의 value = 전달 받은 value
    // onChange가 발생하면 event객체를 받아서 onChange event handler에
    // e.target.value를 전달해주면 된다
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {/* option 구현 */}
      {optionList.map((it, idx) => (
        // it.name = sortOptionList의 각 객체의 name을 가리킨다
        // 그 name에 해당하는 value를 it.value로 넣어준다
        // 마지막으로 각 항목을 식별하는 값인 key를 전달해줌
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

// DiaryList 생성
const DiaryList = ({ diaryList }) => {
  // 정렬 기능
  // 정렬 기준을 저장할 state 생성
  const [sortType, setSortType] = useState("lastest");

  // 정렬 기능 구현
  const getProcessedDiaryList = () => {
    // 배열을 정렬하기 위해서 비교 함수를 만들어 준다
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // diaryList.sort() => 원본 배열 자체를 재정렬 = 사용X
    // JSON.stringify(diaryList) = diaryList를 JSON화 시킴
    // JSON.parse() = 다시 배열로 복화시켜줌
    // = 배열에서 문자열로 바뀌었다가 다시 배열로 바뀌면서
    // copyList에 값만 들어가게 된다
    // => 원본 배열을 건드리지 않으면서 배열을 정렬 가능하게 해줌
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 비교함수를 이용해 dairyList 정렬 = compare함수 전달
    const sortedList = copyList.sort(compare);
    // 정렬된 함수 반환
    return sortedList;
  };

  // prop으로 전달받은 diaryList를 map()으로 list rendering
  return (
    <div>
      {/* ControlMenu 추가 */}
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {/* 정렬함수 이후로는 diaryList로 rendering을 하는것이 아니라
           getProcessedDiaryList()함수를 실행한 결과값을 render하도록 해준다  */}
      {/* {diaryList.map((it) => ( */}
      {getProcessedDiaryList().map((it) => (
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
