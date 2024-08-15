import IndianFlagSvg from "../assets/india.svg";
import "./PhoneInput.css";
import inputNumberHandler from "../handlers/inputNumberHandler";

function PhoneInput({ phoneNumber, setPhoneNumber, isActive = true }) {
  return (
    <div
      className={`phoneInputBox ${isActive ? "" : "inactive"}`}
      onClick={(e) => {
        if (e.target.tagName !== "INPUT") {
          e.target.querySelector("input").focus();
        }
      }}
    >
      <img src={IndianFlagSvg} alt="Indian Flag" />
      <span>+91 - </span>
      <input
        type="number"
        id="phone"
        placeholder="XXXXXXXXXX"
        value={phoneNumber}
        {...inputNumberHandler(phoneNumber, setPhoneNumber, "", 9999999999)}
      />
    </div>
  );
}

export default PhoneInput;
