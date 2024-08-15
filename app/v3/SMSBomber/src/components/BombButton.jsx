import "./BombButton.css";
import ApiController from "../handlers/ApiController.js";
import isValidPhoneNumber from "../handlers/phoneNumberValidator.js";

function BombButton({
  phoneNumber,
  smsCount,
  smsDelay,
  setToastQueue,
  toastQueue,
  bombingStatus,
  setBombingStatus,
}) {
  const toasts = {
    success: {
      title: "Bombing Initiated",
      message:
        "SMS Bombing initiated successfully for phone number: " + phoneNumber,
      type: "toastSuccess",
    },
    failed: {
      title: "Bombing Failed",
      message:
        "Failed to initiate SMS Bombing for phone number: " + phoneNumber,
      type: "toastError",
    },
    error: {
      title: "Something went wrong",
      message:
        "An error occurred while initiating SMS Bombing. Please try again later.",
      type: "toastWarning",
    },
    invalidNumber: {
      title: "Invalid Phone Number",
      message: "Seems like the phone number you entered is invalid.",
      type: "toastWarning",
    },
  };

  async function handleClick() {
    setBombingStatus("bombing");
    const isValid = await isValidPhoneNumber(phoneNumber);

    if (isValid === -1) {
      setToastQueue([...toastQueue, toasts.error]);
    } else if (!isValid) {
      setToastQueue([...toastQueue, toasts.invalidNumber]);
    } else {
      let bombingResponse = await ApiController.initiateSMSBombing(
        phoneNumber,
        smsCount,
        smsDelay
      );

      if (bombingResponse === 1) {
        setToastQueue([toasts.success, ...toastQueue]);
      } else if (bombingResponse === 0) {
        setToastQueue([toasts.failed, ...toastQueue]);
      } else {
        setToastQueue([toasts.error, ...toastQueue]);
      }
    }
    setBombingStatus("notStarted");
  }
  return (
    <button className={`bombButton ${bombingStatus}`} onClick={handleClick}>
      Start Bombing
    </button>
  );
}

export default BombButton;
