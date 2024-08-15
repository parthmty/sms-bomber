import { useState, useEffect } from "react";
import "./App.css";
import PhoneInput from "./PhoneInput.jsx";
import NumberInputSec from "./NumberInputSec.jsx";
import BombButton from "./BombButton.jsx";
import Toast from "./Toast.jsx";
import NavButton from "./NavButton.jsx";
import githubIcon from "../assets/github.svg";

function App() {
  const MIN_SMS_COUNT = 1;
  const MAX_SMS_COUNT = 20;
  const MIN_SMS_DELAY = 1;
  const MAX_SMS_DELAY = 60;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsCount, setSmsCount] = useState(MIN_SMS_COUNT);
  const [smsDelay, setSmsDelay] = useState(MIN_SMS_DELAY);
  const [currentToast, setCurrentToast] = useState("");
  const [toastQueue, setToastQueue] = useState([]);
  const [bombingStatus, setBombingStatus] = useState("notStarted");

  useEffect(toastQueueHandler, [currentToast, toastQueue]);

  function toastQueueHandler() {
    if (currentToast === "") {
      if (toastQueue.length > 0) {
        setCurrentToast(toastQueue.pop());
      }
    }
  }

  return (
    <div className="app">
      <NavButton icon={githubIcon}>Github</NavButton>
      <p className="title" data-status="BETA">
        SMSBomber
      </p>
      <PhoneInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isActive={bombingStatus === "notStarted"}
      />
      <NumberInputSec
        min={MIN_SMS_COUNT}
        max={MAX_SMS_COUNT}
        inputId="smsCount"
        boxValue={smsCount}
        setBoxValue={setSmsCount}
        isActive={bombingStatus === "notStarted"}
      >
        SMS Count
      </NumberInputSec>
      <NumberInputSec
        min={MIN_SMS_DELAY}
        max={MAX_SMS_DELAY}
        boxType="time"
        inputId="smsDelay"
        boxValue={smsDelay}
        setBoxValue={setSmsDelay}
        isActive={bombingStatus === "notStarted"}
      >
        Delay
      </NumberInputSec>
      <BombButton
        phoneNumber={phoneNumber}
        smsCount={smsCount}
        smsDelay={smsDelay}
        setToastQueue={setToastQueue}
        toastQueue={toastQueue}
        bombingStatus={bombingStatus}
        setBombingStatus={setBombingStatus}
      />

      <div className="toastContainer">
        {currentToast === "" || (
          <Toast
            title={currentToast.title}
            message={currentToast.message}
            type={currentToast.type}
            setCurrentToast={setCurrentToast}
          />
        )}
      </div>
    </div>
  );
}

export default App;
