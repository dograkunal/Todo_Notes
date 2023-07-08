import React, { useState, useRef, useEffect } from "react";
import ModalComponent from "./modalComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, addTask } from "./landingSlice";
import Plus from "../assets/plus.png";
import DoneIC from "../assets/Done.png";
import DeleteIC from "../assets/Remove.png";
import { HiOutlinePencil } from "react-icons/hi2";

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
    console.log(editOpen, "Edit open", isOpen, "Is Open");
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

      {isOpen && !editOpen ? (
        <ModalComponent
          // ref={ref}
          handler={handleAddToDo}
          modalValue={localTask}
          onChangeValue={setLocalTask}
          editOpen={editOpen}
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
  const [editting, setEdit] = useState();

  function handleEditToDo() {
    console.log(editting);
  }

  function editModal(el) {
    setEditOpen(true);
    editComponent(el);
    handleModal();
  }

  function editComponent(el) {
    console.log(el.task, "Element editComponent");
    return (
      <>
        <ModalComponent
          handler={handleEditToDo}
          modalValue={el.task}
          editOpen={editOpen}
          onChangeValue={setEdit}
        />
      </>
    );
  }

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
              <button
                onClick={() => {
                  editModal(el);
                }}
              >
                <HiOutlinePencil />
                Edit
              </button>
              <button>
                <img
                  src={DeleteIC}
                  onClick={() => handleDeleteTodo(el.id)}
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
