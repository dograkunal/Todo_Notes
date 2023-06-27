import React, { useState, useRef, useEffect } from "react";
import "./landing.css";
import Plus from "../assets/plus.png";


const HeaderComponent = () => {
  return (<div className="header_main">
    <div className="headerFont">To-Do APP</div>
    <div className="inputContainer">
      <input
        placeholder="Search Task"
        name="Search"
        className="inputBox"
      />
    </div>
  </div>);
};

const TaskComponent = ({ list = [] }) => {
  return (<div className="main_body">
    {list.map((el, index) => (<div key={el + index} className="task_detail">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    </div>))}
  </div>);
}


export default function landing() {
  const [isOpen, setIsopen] = useState(false);
  const ref = useRef();
  const addref = useRef();

  const handleModal = () => {
    isOpen ? setIsopen(false) : setIsopen(true);
  };

  useEffect(() => {
    const clickedOutside = (e) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(e.target) &&
        addref.current &&
        !addref.current.contains(e.target)
      ) {
        setIsopen(false);
      }
    };

    document.addEventListener("click", clickedOutside);
    return () => {
      document.removeEventListener("click", () => { });
    };
  }, [isOpen]);
  const list = Array(50).fill(Math.random());
  return (
    <>
      {/* <div className="foundation_class"> */}
      <HeaderComponent />
      <TaskComponent list={list} />

      <div className="footer">
        Footer

        <div className="addButton">
          <button onClick={handleModal} ref={addref}>
            <img style={{ width: 40, height: 40 }} src={Plus} alt="Add Task" />
          </button>
        </div>
      </div>
      {/* </div> */}

      {isOpen ? (
        <div className="modalBase">
          <button className="addButton_inner" onClick={handleModal}>
            Add
          </button>
          <div className="addTaskModal" ref={ref}>
            <div className="taskModalHeading">Add Your Task</div>
            <div className="inputContainer_modal">
              <input
                placeholder="Type your Task"
                name="Add Task"
                className="inputBox"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
