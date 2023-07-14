import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskData } from "../listSlice";
import InputCustom from "../utility/InputCustom";
import ButtonCustom from "../utility/ButtonCustom";
import { editTask } from "../listSlice";

function editModal() {
  const InitialState = {
    isImmediate: "",
    creator: "",
    task: "",
  };
  const [data, setData] = useState(InitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const taskDetails = useSelector(
    (state) =>
      state &&
      state.List &&
      state.List.taskDetails &&
      state.List.taskDetails.payload
  );

  const taskSuccess = useSelector(
    (state) => state && state.List && state.List.updatedTask
  );

  const updateForm = (datas) => {
    setData({
      isImmediate: datas.isImmediate,
      creator: datas.creator,
      task: datas.task,
    });
  };

  useEffect(() => {
    if (taskSuccess) {
      navigate("/dashboard", { replace: true });
    }
  }, [taskSuccess]);

  useEffect(() => {
    if (id) {
      dispatch(getTaskData(id));
    }
  }, []);

  useEffect(() => {
    if (taskDetails) {
      updateForm(taskDetails);
    }
  }, [taskDetails]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setData((el) => ({ ...el, [name]: value }));
  };
  //can be reused with having add and edit in same modal

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setData((el) => ({ ...el, [name]: e.target.checked }));
  };
  //can be reused with having add and edit in same modal

  const handleSubmit = () => {
    dispatch(editTask({ id: id, data: data }));
  };

  console.log(taskDetails, "details");
  return (
    <>
      <h3>Edit data component</h3>
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

export default editModal;
