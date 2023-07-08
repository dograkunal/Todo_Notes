import React, { useState, useRef, useEffect } from "react";
import ModalComponent from "./modalComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, addTask, editTask } from "./landingSlice";
import Plus from "../assets/plus.png";
import DoneIC from "../assets/Done.png";
import DeleteIC from "../assets/Remove.png";
import { HiOutlinePencil, HiMiniArrowDownTray } from "react-icons/hi2";

import "./landing.scss";

export default function landing() {
  const [isOpen, setIsopen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [localTask, setLocalTask] = useState(" ");
  const ref = useRef();
  const addref = useRef();
  const taskToDo = useSelector(
    (state) => state && state.ToDoTask && state.ToDoTask.notes
  );

  const dispatch = useDispatch();

  const handleModal = () => {
    console.log(editOpen);
    if (editOpen) {
      setIsopen(true);
    }
    isOpen ? setIsopen(false) : setIsopen(true);
  };

  function handleDeleteTodo(i) {
    dispatch(deleteTask(i));
  }

  function handleAddToDo() {
    if (localTask === " ") {
      alert("This cannot be Empty");
    } else {
      dispatch(addTask(localTask));
      handleModal();
      setLocalTask(" ");
    }
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
      <TaskComponent
        taskToDo={taskToDo}
        handleDeleteTodo={handleDeleteTodo}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        handleModal={handleModal}
      />

      <div className="footer">Footer</div>

      <div>
        <button className="addButton" onClick={handleModal} ref={addref}>
          <img src={Plus} alt="Add Task" />
        </button>
      </div>

      {isOpen ? (
        <ModalComponent
          // ref={ref}
          handler={handleAddToDo}
          modalValue={localTask}
          onChangeValue={setLocalTask}
          // editOpen={editOpen}
        />
      ) : null}
    </div>
  );
}

const TaskComponent = ({
  taskToDo,
  handleDeleteTodo,
  setEditOpen,
  handleModal,
  editOpen,
}) => {
  return (
    <div className="mainBody">
      {taskToDo &&
        taskToDo.map((el, index) => (
          <span key={el.id}>
            <TaskManipulator
              el={el}
              index={index}
              handleDeleteTodo={handleDeleteTodo}
            />
          </span>
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

function TaskManipulator({ el, index, handleDeleteTodo }) {
  const [editing, setEditing] = useState(false);
  // const [editData, setEditData] = useState(el.task);
  const dispatch = useDispatch();

  debugger;
  const handleChange = (e) => {
    //dikkat yha hai !
    let data = { id: el.id, value: e.target.value };
    dispatch(editTask(data));
    console.log(el.id, e.target.value, "Line 137");
  };

  let todoManipulation;
  if (editing) {
    console.log(editing, "Editing True");
    todoManipulation = (
      <>
        <input
          value={el.task}
          onChange={(e) => handleChange({ ...el.task, task: e.target.value })}
        />
        <button onClick={() => setEditing(false)}>
          <HiMiniArrowDownTray />
          Save
        </button>
      </>
    );
  } else {
    todoManipulation = (
      <>
        <p>{el.task}</p>
        <button onClick={() => setEditing(true)}>
          <HiOutlinePencil />
          Edit
        </button>
      </>
    );
  }
  return (
    <div className="taskDetail" key={el + index}>
      <div>
        <button>
          <img src={DoneIC} alt="Task Done" />
        </button>
      </div>
      <div className="taskDisplay">
        {todoManipulation}
        <button>
          <img
            src={DeleteIC}
            onClick={() => handleDeleteTodo(el.id)}
            alt="Task Done"
          />
        </button>
      </div>
    </div>
  );
}
