import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

import MyButton from "./MyButton";
import SwapMonth from "./SwapMonth";
import EmotionItem from "./EmotionItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || ""


const DiaryEditor = ( { isEdit, originData } ) => {

  // 일기 쓰는 창 내용
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));

  // 클릭할 시 감정 변화
  const [emotion, setEmotion] = useState(3);

  // 작성완료 버튼 클릭 시
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext); // App.js에서 onCreate, onEdit 함수 가져옴
  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
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

    navigate("/", { replace: true }); // 작성완료 버튼 누르면 HOME 화면으로 돌아가서 다시 돌아오지 못하도록 함
  };

  const handleRemove = () => {
    if(window.confirm("정말 삭제하시겠습니까?")){
      onRemove(originData.id);
      navigate("/", {replace : true});
    }
  }

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <SwapMonth
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"<"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section style={{marginTop: "30px", marginBottom: "50px"}}>
          <div class="question_box">
            <span class="question">오늘은 언제인가요?</span>
          </div>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section style={{marginBottom: "50px"}}>
          <div class="question_box">
            <span class="question">오늘의 감정</span>
          </div>
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
        <section style={{marginBottom: "30px"}}>
          <div class="question_box">
            <span class="question">오늘의 일기</span>
          </div>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘 당신의 하루는 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box" style={{marginBottom: "80px"}}>
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;