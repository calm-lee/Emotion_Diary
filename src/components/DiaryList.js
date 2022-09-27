import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ContorlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const filterCallBack = (item) => {
    if (filter === "good") {
      return parseInt(item.emotion) <= 3;
    } else {
      return parseInt(item.emotion) > 3;
    }
  };

  const getProcessedDiaryList = () => {
    // 시간 순 정렬을 위한 비교함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); // 음수: 내림차순
      } else {
        return parseInt(a.date) - parseInt(b.date); // 양수: 오름차순
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 원본 diaryList에 영향이 안 가도록 JSON string -> 다시 JSON 배열로 만든 List

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 비교함수를 이용한 시간 순 정렬
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      <MyButton
        type={"positive"}
        text={"새 일기 쓰기"}
        onClick={() => navigate("/new")}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
