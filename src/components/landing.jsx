import React, { useState, useRef, useEffect } from "react";
import ModalComponent from "./modalComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, addTask, editTask, searchTask } from "./landingSlice";
import Plus from "../assets/plus.png";
import DoneIC from "../assets/Done.png";
import DeleteIC from "../assets/Remove.png";
import {
  HiOutlinePencil,
  HiMiniArrowDownTray,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

import "./landing.scss";

export default function landing() {
  const [isOpen, setIsopen] = useState(false);
  const [localTask, setLocalTask] = useState({ id: 0, task: " " });
  const ref = useRef();
  const addref = useRef();
  const taskToDo = useSelector(
    (state) => state && state.ToDoTask && state.ToDoTask.notes
  );

  const dispatch = useDispatch();

  const handleModal = () => {
    isOpen ? setIsopen(false) : setIsopen(true);
  };

  function handleDeleteTodo(i) {
    dispatch(deleteTask(i));
  }

  function handleAddToDo(e) {
    e.preventDefault();
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
        />
      ) : null}
    </div>
  );
}

const TaskComponent = ({ taskToDo, handleDeleteTodo }) => {
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
  const [SearchValue, setSearchvalue] = useState(" ");
  const dispatch = useDispatch();

  const handleSearch = () => {
    console.log(SearchValue);
    dispatch(searchTask(SearchValue));
    // const {value} = e.target;
  };

  return (
    <div className="headerMain">
      <div className="headerFont">To-Do APP</div>
      <div className="inputContainer">
        <input
          placeholder="Search Task"
          name="Search"
          className="inputBox"
          onChange={(e) => {
            setSearchvalue(e.target.value);
          }}
        />
        <button onClick={handleSearch}>
          <HiOutlineMagnifyingGlass />
        </button>
      </div>
    </div>
  );
};

function TaskManipulator({ el, index, handleDeleteTodo }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...el });
  const dispatch = useDispatch();
  const handleEditTodo = () => {
    let data = { id: el.id, task: editData.task, done: false };
    dispatch(editTask(data));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((field) => {
      return { ...field, [name]: value };
    });
    handleEditTodo();
  };

  let todoManipulation;
  if (editing) {
    todoManipulation = (
      <>
        <input name="task" value={editData.task} onChange={handleEditChange} />
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
