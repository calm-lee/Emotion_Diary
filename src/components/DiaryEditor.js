import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryContextDispatch, { DiaryDispatchContext } from "./../App.js";

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

const DiaryEditor = (isEdit, originData) => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(new Date()));

  // 클릭할 시 감정 변화
  const [emotion, setEmotion] = useState(3);
  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  // 일기 쓰는 창 내용
  const contentRef = useRef();
  const [content, setContent] = useState("");

  // 작성완료 버튼 클릭 시
  const { onCreate, onEdit } = useContext(DiaryDispatchContext); // App.js에서 onCreate, onEdit 함수 가져옴

  const handleSumbit = () => {
    if (content.length < 1) {
      // 한 자도 안 채웠을 경우
      contentRef.current.focus();
      return; // return으로 더 진행시키지 못하도록 함
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    onCreate(date, content, emotion); // 1자 이상일 시 onCreate 작동
    navigate("/", { replace: true }); // 작성완료 버튼 누르면 HOME 화면으로 돌아가서 다시 돌아오지 못하도록 함
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div>
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
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
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div>
            <textArea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={`positive`}
              onClick={handleSumbit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
