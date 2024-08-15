class ApiController {
  #GITHUB_USERNAME = "guruwovi";
  #GITHUB_REPOSITORY_NAME = "Bombit";
  #API_TOKEN = "";

  #API_URL = `https://api.github.com/repos/${this.#GITHUB_USERNAME}/${
    this.#GITHUB_REPOSITORY_NAME
  }/dispatches`;

  async initiateSMSBombing(phoneNumber, smsCount, smsDelay) {
    try {
      let bombingResponse = await fetch(this.#API_URL, {
        method: "POST",
        headers: {
          Authorization: this.#API_TOKEN,
          Accept: "application/vnd.github.everest-preview+json",
        },
        body: JSON.stringify({
          event_type: "bombit",
          client_payload: {
            phone_number: phoneNumber,
            count: smsCount,
            delay: smsDelay,
          },
        }),
      });

      if (bombingResponse.ok) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      return -1;
    }
  }
}

export default new ApiController();
