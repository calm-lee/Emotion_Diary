import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  return (
    <div>
      <h2>Edit</h2>
    </div>
  );
};

export default Edit;
