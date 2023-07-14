function ButtonCustom({ text, onClick, type }) {
  return (
    <>
      <button type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
}

export default ButtonCustom;
