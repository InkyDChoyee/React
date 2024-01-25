import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  // Home component에서는
  // diaryList라는 이름으로 useContext()를 활용해서
  // DiaryStateContext를 통해서 일기 데이터를 공급 받음
  const diaryList = useContext(DiaryStateContext);

  // => diaryList를 curDate state의 날짜에 따라 가공
  // 가공된 data를 state로 관리 => state 생성
  const [data, setData] = useState([]);

  // header에 저장할 날짜 status 필요
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년, ${curDate.getMonth() + 1}월`;

  // Home component에서 curDate날짜가 이동하게 되면
  // 그때 diaryList에서 지금 현재 연도와 월에 해당하는 일기들만 출력
  // useEffect()를 활용하여 curDate가 변화하는 순간에만
  // diaryList에서 그 날짜에 해당하는 일기 data만 뽑아오도록 함
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1 // = 이번연도 이번월의 1일 = firstDay 생성
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0 // = 이번연도 다음월의 0일 = lastDay 생성
      ).getTime();

      // 첫일과 말일 사이에 작성된 일기 데이터만 filtering 한다
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
      // deps에 diaryList를 전달해주지 않게 되면
      // useEffect가 diaryList가 바꼈을 때(추가, 수정, 삭제) 동작을 하지 않는다
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
