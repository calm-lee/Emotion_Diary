import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "./../components/MyHeader";
import SwapMonth from "./../components/SwapMonth";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";
const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const title = "하루온도";
  const monthText = `${curDate.getMonth() + 1}월`;

  useEffect(()=>{
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `하루온도, 당신의 감정 일기장`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const increaseMoth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader 
        title={title}
      />
      <SwapMonth
        monthText={monthText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMoth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
