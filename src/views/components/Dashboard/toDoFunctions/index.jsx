import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask, removeTask } from "../listSlice";
import { useNavigate } from "react-router-dom";
import AddData from "./addData";
import InputCustom from "../utility/InputCustom";
import ButtonCustom from "../utility/ButtonCustom";

function Dashboard() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state && state.Login.token);

  const list = useSelector(
    (state) =>
      state &&
      state.List &&
      state.List.tasksList &&
      state.List.tasksList.payload
  );

  useEffect(() => {
    dispatch(getTask());
  }, []);

  return (
    <div className="DashboardBase">
      <div>
        <AddData token={token} />
      </div>
      <div>List Component</div>
      {list &&
        list.map((data, index) => (
          <div key={index}>
            <div>
              <span>
                Task:
                {data && data.task}
              </span>
              <span>Creator: {data && data.creator}</span>
            </div>
            <button
              key={index}
              onClick={() => dispatch(removeTask(data.taskId))}
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/dashboard/edit/${data.taskId}`, {
                  replace: true,
                });
              }}
            >
              Edit
            </button>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
