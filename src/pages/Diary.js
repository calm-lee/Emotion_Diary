import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩 중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text="수정하기"
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className="diary_img_wrapper">
              <img src={curEmotionData.emotion_img} />
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
