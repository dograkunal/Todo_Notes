import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, addTask } from "./landingSlice";
import Plus from "../assets/plus.png";
import DoneIC from "../assets/Done.png";
import DeleteIC from "../assets/Remove.png";
import "./landing.scss";

export default function landing() {
  const [isOpen, setIsopen] = useState(false);
  const ref = useRef();
  const addref = useRef();
  const taskToDo = useSelector(
    (state) => state && state.ToDoTask && state.ToDoTask.notes
    // && state.ToDoTask.tasks
  );

  const dispatch = useDispatch();
  const [localTask, setLocalTask] = useState();
  const handleModal = () => {
    isOpen ? setIsopen(false) : setIsopen(true);
  };

  function handleDeleteTodo(i) {
    dispatch(deleteTask(i));
  }

  function handleAddToDo() {
    dispatch(addTask(localTask));
    handleModal();
    setLocalTask(" ");
  }

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
    <div className="foundationClass">
      <HeaderComponent />
      <TaskComponent taskToDo={taskToDo} handleDeleteTodo={handleDeleteTodo} />

      <div className="footer">Footer</div>

      <div>
        <button className="addButton" onClick={handleModal} ref={addref}>
          <img src={Plus} alt="Add Task" />
        </button>
      </div>

      {isOpen ? (
        <div className="modalBase">
          <div className="addTaskModal" ref={ref}>
            <div className="taskModalHeading">Add Your Task</div>
            <div className="inputContainer">
              <input
                placeholder="Type your Task"
                className="inputBox"
                value={localTask}
                onChange={(e) => {
                  setLocalTask(e.target.value);
                }}
              />
            </div>
            <button onClick={handleAddToDo}>Add Task</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const TaskComponent = ({ taskToDo, handleDeleteTodo }) => {
  console.log(taskToDo, "Task");
  return (
    <div className="mainBody">
      {taskToDo &&
        taskToDo.map((el, index) => (
          <div className="taskDetail" key={el + index}>
            <div>
              <button>
                <img src={DoneIC} alt="Task Done" />
              </button>
            </div>
            <p>{el.task}</p>
            <div>
              <button>
                <img
                  src={DeleteIC}
                  onClick={() => handleDeleteTodo(el.task)}
                  // onClick={() => handleDeleteTodo(el)}
                  alt="Task Done"
                />
              </button>
            </div>
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
