const API_URL =
  "https://phonevalidation.abstractapi.com/v1/?api_key=ab0a2916b8b945be92364a443e3486c3&phone=";
const RETRY_COUNT = 3;

export default async function isPhoneNumberValid(phoneNumber) {
  try {
    let response = await fetch(API_URL + "91" + phoneNumber);
    if (response.ok) {
      let data = await response.json();
      if (data.success === false) {
        return -1;
      }
      return Boolean(data.valid);
    } else {
      for (let i = 0; i < RETRY_COUNT; i++) {
        response = await fetch(API_URL + "91" + phoneNumber);
        if (response.ok) {
          let data = await response.json();
          return Boolean(data.valid);
        }
      }
      return -1;
    }
  } catch (error) {
    return -1;
  }
}
