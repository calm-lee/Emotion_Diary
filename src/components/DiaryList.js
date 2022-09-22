import { useState } from "react";

const sortOptionList = [{ value: "latest", name: "최신순" }];

const ControlMenu = ({ value, onChange, optionList }) => {
  return <select></select>;
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  return (
    <div>
      <ControlMenu value={sortType} onChange={setSortType} />
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
