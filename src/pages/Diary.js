import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { DiaryStateContext } from "../App";

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

  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이 곳은 일기 상세 페이지입니다.</p>
    </div>
  );
};

export default Diary;
