import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouterTest from "./components/RouterTest";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//MyButton
import MyButton from "./components/MyButton";

//MyHeader
import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT":
      {
        newState = state.map((it) =>
          it.id === action.data.id ? { ...action.data } : it
        );
      }
      break;
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyDate = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1663709598803,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1663709598804,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1663709598805,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1663709598806,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1663709598807,
  },
];

function App() {
  useEffect(() => {
    localStorage.setItem("key", 10);
  }, []);

  const [data, dispatch] = useReducer(reducer, dummyDate);

  console.log(new Date().getTime());

  const dataId = useRef(6);

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        data: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
              headText={"App"}
              leftChild={
                <MyButton
                  text={"왼쪽 버튼"}
                  onClick={() => alert("왼쪽 클릭")}
                />
              }
              rightChild={
                <MyButton
                  text={"오른쪽 버튼"}
                  onClick={() => alert("오른쪽 클릭")}
                />
              }
            />
            <h2>App.js</h2>

            <MyButton
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"positive"}
            />
            <MyButton
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"negative"}
            />
            <MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
export default App;
