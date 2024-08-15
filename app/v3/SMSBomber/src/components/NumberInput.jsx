import "./NumberInput.css";
import inputNumberHandler from "../handlers/inputNumberHandler";

function NumberInput({
  min,
  max,
  inputId,
  boxValue,
  setBoxValue,
  boxType = "number",
  ...props
}) {
  const customHandlers = {
    onInput: function (e) {
      e.target.style.width = `${e.target.value.length}ch`;
    },

    onBlur: function (e) {
      e.target.style.width = `${e.target.value.length}ch`;
    },
  };

  return (
    <div
      className="numberInputBox"
      onClick={(e) => {
        e.target.querySelector("input")?.focus();
      }}
    >
      <input
        id={inputId}
        type="number"
        style={{ width: `${String(min).length}ch` }}
        value={boxValue}
        {...inputNumberHandler(boxValue, setBoxValue, min, max, customHandlers)}
      />
      {boxType === "time" ? <label htmlFor={inputId}>s</label> : ""}
    </div>
  );
}

export default NumberInput;
