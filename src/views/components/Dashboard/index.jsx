import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "./listSlice";
import InputCustom from "./utility/InputCustom";
import ButtonCustom from "./utility/ButtonCustom";

function Dashboard() {
  const dispatch = useDispatch();

  const list = useSelector(
    (state) => state && state.List && state.List.tasksList
  );
  console.log(list, "from dahboard");

  useEffect(() => {
    dispatch(getTask());
  }, []);

  return (
    <div className="DashboardBase">
      {/* {list.map((data, index) => (
        <div key={index}>
          <ol>
            <li>{data.taskId}</li>
            <li>{data && data.task}</li>
            <li>{data && data.creater}</li>
          </ol>
          <button key={index} onClick={() => {}}>
            Delete
          </button>
          <button onClick={() => {}}>Edit</button>
        </div>
      ))} */}
    </div>
  );
}

export default Dashboard;
