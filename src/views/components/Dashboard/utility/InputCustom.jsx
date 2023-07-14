import React from "react";

function InputCustom({ type, value, placeholder, name, onChange }) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default InputCustom;
