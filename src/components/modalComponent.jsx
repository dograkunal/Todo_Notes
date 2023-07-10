import React from "react";

export default function modalComponent({
  ref,
  handler,
  modalValue,
  onChangeValue,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeValue(() => {
      return {
        [name]: value,
        id: Math.floor(Math.random() * 1000),
      };
    });
  };

  return (
    <div className="modalBase">
      <div className="addTaskModal" ref={ref}>
        <div className="taskModalHeading">Add Your Task</div>
        <div className="inputContainer">
          <input
            className="inputBox"
            name="task"
            value={modalValue.task}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <button onClick={handler}>Submit Task</button>
      </div>
    </div>
  );
}
