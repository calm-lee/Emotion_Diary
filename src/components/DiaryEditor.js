import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion2.png",
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion3.png",
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion4.png",
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion5.png",
    emotion_descript: "끔찍함",
  },
];

export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  return (
    <div>
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로 가기"} onClick={() => navigate(-1)} />
        }
      />
      <div className="DiaryEditor">
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem key={it.emotion_id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;