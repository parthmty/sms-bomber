import { LitElement, html, css } from 'lit-element';
import indianFlag from '../assets/images/indian_flag.svg';

export class SMPhoneBox extends LitElement {
    static properties = {
        warnText: { type: String },
        isWarning: { type: Boolean },
        currentPhoneNumber: { type: String }
    }

    constructor() {
        super();
        this.warnText = "Invalid Phone Number";
        this.isWarning = false;
        this.currentPhoneNumber = "";
    }

    static styles = css`
        section {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 18px 20px;
            width: 100%;
            outline: 2px solid var(--outline-variant);
            border-radius: 8px;
            margin-top: 30%;
            position: relative;
        }

        section:focus-within {
            outline: 2px solid var(--outline);
        }

        section::after {
            content: attr(data-warn-text);
            display: none;
            position: absolute;
            bottom: 0;
            left: 10px;
            transform: translateY(100%);
            color: var(--error);
        }

        .warning::after {
            display: block;
        }

        img {
            height: 18px;
        }

        div{
            height: 20px;
            border-left: 2px solid var(--outline-variant);
        }

        p{
            font-size: 18px;
            line-height: 16px;
            font-weight: normal;
            color: var(--on-surface-variant);
            padding: 0;
            margin: 0;
        }

        input {
            width: 100%;
            height: 18px;
            padding: 0 4px;
            border: none;
            outline: none;
            font-size: 18px;
            font-weight: normal;
            color: var(--on-surface);
            background-color: transparent;
        }

        /* Chrome, Safari, Edge, Opera */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }


        /* Firefox */
        input[type="number"] {
            appearance: textfield;
            -moz-appearance: textfield;
        }

        .warning{
            outline: 2px solid var(--error) !important;
        }
    `

    handleInputChange = (e) => {
        this.currentPhoneNumber = e.target.value;
        if (this.currentPhoneNumber.length > 10) {
            this.warnText = "Phone number should be 10 digits";
            this.isWarning = true;
            this._phoneValdidatorSign(false);
        } else if (this.currentPhoneNumber.length < 10) {
            this.isWarning = false;
            this._phoneValdidatorSign(false);
        } else {
            if (this.isValidPhoneNumber()) {
                this.isWarning = false;
                this._phoneValdidatorSign(true);
            } else {
                this.warnText = "Invalid phone number";
                this.isWarning = true;
                this._phoneValdidatorSign(false);
            }
        }
    }

    _phoneValdidatorSign(signalType) {
        this.dispatchEvent(new CustomEvent('valid-phone-number', {
            detail: {
                isValid: signalType,
                phoneNumber: this.currentPhoneNumber
            },
            bubbles: true,
            composed: true
        }));
    }


    isValidPhoneNumber() {
        const phoneNumber = `91${this.currentPhoneNumber}`;
        return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/g.test(phoneNumber);
    }

    render() {
        return html`
            <section class="${this.isWarning ? 'warning' : ''}" data-warn-text="${this.warnText}">
                <img src="${indianFlag}" alt="Indian Flag">
                <div class="divider"></div>
                <p>+91</p>
                <input type="number" placeholder="Enter phone number" value="${this.currentPhoneNumber}" @input="${this.handleInputChange}" @focus="${this.handleInputFocus}" />
            </section>
        `;
    }
}

customElements.define('sm-phone-box', SMPhoneBox);