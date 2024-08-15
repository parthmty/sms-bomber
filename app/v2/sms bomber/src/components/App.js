import { LitElement, html, css } from 'lit-element';
import { SMHead } from './SMHead.js';
import { SMNav } from './SMNav.js';
import { SMScreen } from './SMScreen.js';

import { PhoneLogController } from './PhoneLogController.js';
import { BomberController } from './BomberController.js';

export class App extends LitElement {
    static properties = {
        currentStep: { type: Number },
        isBackButtonHidden: { type: Boolean },
        isNextButtonHidden: { type: Boolean },
        isCancelButtonHidden: { type: Boolean },
        isHomeButtonHidden: { type: Boolean },
        isBombButtonHidden: { type: Boolean },
        isBackButtonDisabled: { type: Boolean },
        isNextButtonDisabled: { type: Boolean },
        isCancelButtonDisabled: { type: Boolean },
        isHomeButtonDisabled: { type: Boolean },
        isBombButtonDisabled: { type: Boolean },

        isHeaderHidden: { type: Boolean },
        progress: { type: Number },

        loaderText: { type: String },

        resultType: { type: String },
        resultTitle: { type: String },
        resultMessage: { type: String },

        bombingTimeout: { type: Number },

        PHONE: { type: String }
    }

    constructor() {
        super();
        this.currentStep = 1;
        this.isBackButtonHidden = false;
        this.isNextButtonHidden = false;
        this.isCancelButtonHidden = true;
        this.isHomeButtonHidden = true;
        this.isBombButtonHidden = true;
        this.isBackButtonDisabled = true;
        this.isNextButtonDisabled = true;
        this.isCancelButtonDisabled = true;
        this.isHomeButtonDisabled = true;
        this.isBombButtonDisabled = true;

        this.isHeaderHidden = false;
        this.progress = 25;

        this.isNavHidden = false;

        this.loaderText = "Checking Phone Number";

        this.resultType = "error";
        this.resultTitle = "Error";
        this.resultMessage = "Error in Bombing";

        this.PHONE = "";
        this.SMS_COUNT = 1;
        this.SMS_DELAY = 1;
    }


    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;
            max-width: 400px;
            height: 100vh;
            position: relative;
            background-color: var(--surface);
        }

        sm-head {
            width: 100%;
        }

        sm-nav {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
        }

        [hidden] {
            display: none;
        }
    `

    updated(changedProperties) {
        if (changedProperties.has('currentStep')) {
            switch (this.currentStep) {
                case 1:
                    this.isHeaderHidden = false;
                    this.isBackButtonHidden = false;
                    this.isNextButtonHidden = false;
                    this.isBombButtonHidden = true;
                    this.isCancelButtonHidden = true;
                    this.isHomeButtonHidden = true;
                    this.isBackButtonDisabled = true;
                    if (this.PHONE.length === 0) {
                        this.isNextButtonDisabled = true;
                    }
                    this.progress = 25;


                    break;
                case 2:
                    this.isBackButtonDisabled = false;
                    this.isNextButtonDisabled = false;
                    this.isNextButtonHidden = false;
                    this.isBombButtonHidden = true;
                    this.progress = 60;

                    break;
                case 3:
                    this.isNextButtonDisabled = true;
                    this.isNextButtonHidden = true;
                    this.isBombButtonDisabled = false;
                    this.isBombButtonHidden = false;

                    this.progress = 85;
                    break;
                case 4:
                    this.isHeaderHidden = true;
                    this.isBackButtonHidden = true;
                    this.isNextButtonHidden = true;
                    this.isBombButtonHidden = true;
                    this.isCancelButtonHidden = false;
                    this.isHomeButtonHidden = true;
                    this.isCancelButtonDisabled = false;

                    this.bombingTimeout = setTimeout(() => {
                        this.startBombing();
                    }, 3000);
                    break
                case 5:
                    this.isCancelButtonHidden = true;
                    this.isHomeButtonHidden = false;
                    this.isHomeButtonDisabled = false;
                    this.isHeaderHidden = true;

                    break;
            }
        }
    }

    handleValidPhoneNumber(event) {
        this.isNextButtonDisabled = !event.detail.isValid;
        this.PHONE = event.detail.phoneNumber;
    }

    handleButtonClick(event) {
        let type = event.detail.type;
        switch (type) {
            case "cancel":
                clearTimeout(this.bombingTimeout);
                this.resultType = "fail";
                this.resultTitle = "Bombing Request Cancelled";
                this.resultMessage = "You have cancelled the request.";
                break;
        }
        let currentStep = event.detail.currentStep;
        this.currentStep = currentStep;

    }

    handleCountChange(event) {
        if (event.detail.isTimer) {
            console.log(event.detail.count);
            this.SMS_DELAY = event.detail.value;
        } else {
            console.log(event.detail.count);
            this.SMS_COUNT = event.detail.value;
        }
    }

    async startBombing() {
        const phoneLogController = new PhoneLogController();
        let isPhoneNumberAllowed = await phoneLogController.isPhoneNumberAllowed(this.PHONE);
        if (isPhoneNumberAllowed === 1) {
            this.loaderText = "Logging Phone Number";
            // Log the phone number in the database
            let logPhoneNumber = await phoneLogController.logPhoneNumber(this.PHONE);

            if (logPhoneNumber === 1) {
                this.isCancelButtonDisabled = true;
                this.loaderText = "Preparing Bombing Request";
                // Start the bombing
                let bombingResponse = await BomberController.startBombing(this.PHONE, this.SMS_COUNT, this.SMS_DELAY);
                if (bombingResponse === 1) {
                    this.loaderText = "Starting the Bombing Process";
                    const bombingTimeout = setTimeout(() => {
                        this.resultType = "success";
                        this.resultTitle = "Bombing Request Success";
                        this.resultMessage = "The phone number will be bombed shortly.";
                        this.currentStep = 5;
                    }, 3000);
                } else if (bombingResponse === 0) {
                    this.resultType = "fail";
                    this.resultTitle = "Bombing Request Failed";
                    this.resultMessage = "Failed to bomb the phone number. Please try again later.";
                    this.currentStep = 5;
                } else {
                    this.resultType = "fail";
                    this.resultTitle = "Bombing Request Failed";
                    this.resultMessage = "There is some issue with the server. Please try again later.";
                    this.currentStep = 5;
                }
            } else {
                this.resultType = "fail";
                this.resultTitle = "Bombing Request Failed";
                this.resultMessage = "Error in registering the phone number. Please try again later.";
                this.currentStep = 5;
            }
        } else if (isPhoneNumberAllowed === 0) {
            this.resultType = "fail";
            this.resultTitle = "Bombing Request Failed";
            this.resultMessage = "The phone number is already bombed in last 2 hours. Please try again later.";
            this.currentStep = 5;
        } else {
            this.resultType = "fail";
            this.resultTitle = "Bombing Request Failed";
            this.resultMessage = "Error in checking the phone number. Please try again later.";
            this.currentStep = 5;
        }
    }

    render() {
        return html`
            <sm-head .progress="${this.progress}" ?hidden="${this.isHeaderHidden}"></sm-head>
            <sm-screen 
                @valid-phone-number="${this.handleValidPhoneNumber}" 
                .isHeadingHidden="${false}"
                .headText="${"Whom you want to bomb with sms?"}"
                .isPhoneBoxHidden="${false}"
                .currentPhoneNumber="${this.PHONE}"
                ?hidden="${this.currentStep !== 1}"
            ></sm-screen>
            <sm-screen
                @counter-change="${this.handleCountChange}"
                .isHeadingHidden="${false}"
                .headText="${"How many sms you want to send?"}"
                .isStepCounterHidden="${false}"
                .currentStepCount="${1}"
                .isStepCounterTimer="${false}"
                ?hidden="${this.currentStep !== 2}"
            ></sm-screen>
            <sm-screen
                @counter-change="${this.handleCountChange}"
                .isHeadingHidden="${false}"
                .headText="${"How much delay you want between each sms?"}"
                .isStepCounterHidden="${false}"
                .currentStepCount="${1}"
                .isStepCounterTimer="${true}"
                .max="${5}"
                ?hidden="${this.currentStep !== 3}"
            ></sm-screen>
            <sm-screen
                .isHeadingHidden="${true}"
                .isLoaderHidden="${false}"
                .loaderText="${this.loaderText}"
                ?hidden="${this.currentStep !== 4}"
            ></sm-screen>
            <sm-screen
                .isHeadingHidden="${true}"
                .isResultBoxHidden="${false}"
                .resultType="${this.resultType}"
                .resultTitle="${this.resultTitle}"
                .resultMessage="${this.resultMessage}"
                ?hidden="${this.currentStep !== 5}"
            ></sm-screen>


            <sm-nav
                .isBackHidden="${this.isBackButtonHidden}"
                .isNextHidden="${this.isNextButtonHidden}"
                .isCancelHidden="${this.isCancelButtonHidden}"
                .isHomeHidden="${this.isHomeButtonHidden}"
                .isBombHidden="${this.isBombButtonHidden}"
                .isBackDisabled="${this.isBackButtonDisabled}"
                .isNextDisabled="${this.isNextButtonDisabled}"
                .isCancelDisabled="${this.isCancelButtonDisabled}"
                .isHomeDisabled="${this.isHomeButtonDisabled}"
                .isBombDisabled="${this.isBombButtonDisabled}"
                ?hidden="${this.isNavHidden}"
                .currentStep="${this.currentStep}"
                @button-click="${this.handleButtonClick}"
            ></sm-nav>
        `;
    }
}

customElements.define('sm-app', App);