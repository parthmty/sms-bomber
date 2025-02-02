import "./Toast.css";

function Toast({ title, message, type, setCurrentToast }) {
  return (
    <div
      className={`toastBox ${type}`}
      onAnimationEnd={(e) => {
        setCurrentToast("");
      }}
    >
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      <button
        onClick={(e) => {
          setCurrentToast("");
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close">
          <path
            className="svgCross"
            d="m13.414 12 3.293-3.293a1 1 0 0 0-1.414-1.414L12 10.586 8.707 7.293a1 1 0 0 0-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.414-1.414Z"
          ></path>
          <path
            className="svgCrossBg"
            d="M19.07 4.93A10 10 0 1 0 4.93 19.07 10 10 0 1 0 19.07 4.93Zm-2.363 10.363a1 1 0 1 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12Z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Toast;
