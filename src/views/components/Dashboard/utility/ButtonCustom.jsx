function ButtonCustom({ text, onClick }) {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
}

export default ButtonCustom;
