import React, { useEffect, useState } from "react";
import InputCustom from "../utility/InputCustom";
import ButtonCustom from "../utility/ButtonCustom";
import { useDispatch } from "react-redux";
import { addTask } from "../listSlice";
import { useNavigate } from "react-router-dom";

function addData({ token }) {
  const initialState = { task: "", creator: "", isImmediate: false };
  const [data, setData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setData((el) => ({ ...el, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    // debugger
    const { name } = e.target;
    setData((el) => ({ ...el, [name]: e.target.checked }));
  };

  const handleSubmit = () => {
    // debugger;
    console.log(data);
    dispatch(addTask(data));
    setData(initialState);
  };

  return (
    <>
      <h3>Add data component</h3>
      <InputCustom
        type="text"
        placeholder="Add Task"
        name="task"
        value={data.task}
        onChange={handleFieldChange}
      />
      <InputCustom
        type="text"
        placeholder="Creator Name"
        name="creator"
        value={data.creator}
        onChange={handleFieldChange}
      />
      <InputCustom
        type="checkbox"
        placeholder="Immediate"
        name="isImmediate"
        value={data.isImmediate}
        onChange={handleCheckboxChange}
      />
      <label>Is Immediate</label>
      <ButtonCustom type="Submit" text="Submit" onClick={handleSubmit} />
    </>
  );
}

export default addData;
