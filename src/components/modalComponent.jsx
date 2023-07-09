import React from "react";

export default function modalComponent({
  ref,
  handler,
  modalValue,
  onChangeValue,
}) {
  return (
    <div className="modalBase">
      <div className="addTaskModal" ref={ref}>
        <div className="taskModalHeading">Add Your Task</div>
        <div className="inputContainer">
          <input
            className="inputBox"
            name="Task"
            value={modalValue}
            onChange={(e) => {
              onChangeValue(e.target.value);
            }}
          />
        </div>
        <button onClick={handler}>Submit Task</button>
      </div>
    </div>
  );
}
