import React, { useState, useRef, useEffect } from "react";
import "./landing.scss";
import Plus from "../assets/plus.png";

export default function landing() {
  const [isOpen, setIsopen] = useState(false);
  const ref = useRef();
  const addref = useRef();
  const list = Array(10).fill(Math.random());

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
      document.removeEventListener("click", clickedOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* <div className="foundationClass"> */}
      <HeaderComponent />
      <TaskComponent list={list} />

      <div className="footer">Footer</div>

      <div>
        {/* <button className="addButton" onClick={handleModal} ref={addref}>
          <img style={{ width: 40, height: 40 }} src={Plus} alt="Add Task" />
        </button> */}
      </div>

      {isOpen ? (
        <div className="modalBase">
          <div className="addTaskModal" ref={ref}>
            <div className="taskModalHeading">Add Your Task</div>
            <div className="inputContainer">
              <input
                placeholder="Type your Task"
                name="Add Task"
                className="inputBox"
              />
            </div>
            <button className="addButton" onClick={handleModal}>
              Add
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

const TaskComponent = ({ list }) => {
  return (
    <div className="mainBody">
      {list.map((el, index) => (
        <div className="taskDetail" key={el + index}>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </div>
      ))}
    </div>
  );
};

const HeaderComponent = () => {
  return (
    <div className="headerMain">
      <div className="headerFont">To-Do APP</div>
      <div className="inputContainer">
        <input placeholder="Search Task" name="Search" className="inputBox" />
      </div>
    </div>
  );
};
