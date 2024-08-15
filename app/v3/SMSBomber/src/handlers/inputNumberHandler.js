export default function (boxValue, setBoxValue, min, max, customHandlers = {}) {
  return {
    onInput: function (e) {
      const newInputValue = e.target.value;
      const newInputNumber = Number.parseInt(newInputValue);
      if (!e.target.checkValidity()) {
        e.target.value = boxValue;
        setBoxValue(boxValue);
      } else {
        if (newInputValue === "") {
          setBoxValue("");
        } else {
          if (newInputNumber < min) {
            setBoxValue(min);
          } else if (newInputNumber > max) {
            setBoxValue(boxValue);
          } else {
            setBoxValue(newInputValue);
          }
        }
      }

      customHandlers?.onInput?.(e);
    },

    onBlur: function (e) {
      if (e.target.value === "") {
        e.target.value = min;
        setBoxValue(min);
      }

      customHandlers?.onBlur?.(e);
    },
  };
}
