import React, { useState } from "react";
import {
  decrement,
  increment,
  incrementByAmount,
  ResetInitial,
} from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();

  return (
    <>
      <div>
        <button aria-label="Increase" onClick={() => dispatch(increment())}>
          Increase
        </button>
      </div>
      <span>{count}</span>
      <div>
        <button aria-label="Decrease" onClick={() => dispatch(decrement())}>
          Decrease
        </button>
      </div>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button
          aria-label="Amount Increment"
          onClick={() => dispatch(incrementByAmount(Number(amount)) || 0)}
        >
          Increment By amount
        </button>
      </div>
      <div>
        <button
          aria-label="Initial state"
          onClick={() => dispatch(ResetInitial())}
        >
          Initial state
        </button>
      </div>
    </>
  );
}
