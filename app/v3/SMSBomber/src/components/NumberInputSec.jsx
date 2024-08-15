import NumberInput from "./NumberInput.jsx";
import "./NumberInputSec.css";
function NumberInputSec({
  min,
  max,
  inputId,
  boxValue,
  setBoxValue,
  boxType = "number",
  isActive = true,
  ...props
}) {
  return (
    <div className={`numberInputSection ${isActive ? "" : "inactive"}`}>
      <label htmlFor={inputId}>{props.children}</label>
      <NumberInput
        min={min}
        max={max}
        inputId={inputId}
        boxType={boxType}
        boxValue={boxValue}
        setBoxValue={setBoxValue}
      />
    </div>
  );
}

export default NumberInputSec;
