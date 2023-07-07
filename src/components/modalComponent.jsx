import React, { useState } from "react";

export default function modalComponent({
  ref,
  handler,
  value,
  onChangeValue,
  editOpen,
}) {
  // console.log(value, "Value");
  return (
    <div className="modalBase">
      <div className="addTaskModal" ref={ref}>
        <div className="taskModalHeading">Add Your Task</div>
        <div className="inputContainer">
          {!editOpen ? (
            <input
              className="inputBox"
              name="Task"
              value={value}
              onChange={(e) => {
                onChangeValue(e.target.value);
              }}
            />
          ) : (
            <input
              className="inputBox"
              name="Task"
              value={value}
              onChange={(e) => {
                console.log(e);
              }}
            />
          )}
        </div>
        <button onClick={handler}>Submit Task</button>
      </div>
    </div>
  );
}
