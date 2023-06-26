import React, { useState, useRef, useEffect } from "react";
import "./landing.css";
import Plus from "../assets/plus.png";

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
      document.removeEventListener("click", clickedOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="foundation_class">
        <div className="header_main">
          <div className="headerFont">To-Do APP</div>
          <div className="inputContainer">
            <input
              placeholder="Search Task"
              name="Search"
              className="inputBox"
            />
          </div>
        </div>
        <div className="main_body">
          <div className="task_detail"> Stufffffffffff</div>
          <div className="task_detail"> Stufffffffffff</div>
          <div className="task_detail"> Stufffffffffff</div>
          <div className="task_detail"> Stufffffffffff</div>
        </div>

        <button className="addButton" onClick={handleModal} ref={addref}>
          <img style={{ width: 40, height: 40 }} src={Plus} alt="Add Task" />
        </button>

        <div className="footer">Footer</div>
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
