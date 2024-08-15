import { LitElement, html, css } from 'lit-element';
import { SMHeading } from './SMHeading';
import { SMPhoneBox } from './SMPhoneBox';
import { SMStepCounter } from './SMStepCounter';
import { SMLoader } from './SMLoader';
import { SMResultBox } from './SMResultBox';

export class SMScreen extends LitElement {
    static properties = {
        isHeadingHidden: { type: Boolean },
        headText: { type: String },

        isPhoneBoxHidden: { type: Boolean },
        currentPhoneNumber: { type: String },
        isPhoneWarning: { type: Boolean },
        phoneWarnText: { type: String },

        isStepCounterHidden: { type: Boolean },
        currentStepCount: { type: Number },
        isStepCounterTimer: { type: Boolean },
        max: { type: Number },

        isLoaderHidden: { type: Boolean },
        loaderText: { type: String },

        isResultBoxHidden: { type: Boolean },
        resultType: { type: String },
        resultTitle: { type: String },
        resultMessage: { type: String },
    }

    constructor() {
        super();
        this.isHeadingHidden = true;
        this.headText = "";
        this.isPhoneBoxHidden = true;
        this.currentPhoneNumber = "";
        this.isPhoneWarning = false;
        this.phoneWarnText = "";
        this.isStepCounterHidden = true;
        this.currentStepCount = 1;
        this.isStepCounterTimer = false;
        this.isLoaderHidden = true;
        this.loaderText = "";
        this.isResultBoxHidden = true;
        this.resultType = "";
        this.resultTitle = "";
        this.resultMessage = "";
        this.max = 50;
    }

    static styles = css`
        :host {
            box-sizing: border-box;
            padding: 0px 16px;
            line-height: 40px;
            width: 100%;
        }
    `


    render() {
        return html`
            ${this.isHeadingHidden ? "" : html`<sm-heading .heading="${this.headText}"></sm-heading>`}

            ${this.isPhoneBoxHidden ? "" : html`<sm-phone-box .currentPhoneNumber="${this.currentPhoneNumber}" ?isWarning="${this.isPhoneWarning}" .warnText="${this.phoneWarnText}"></sm-phone-box>`}

            ${this.isStepCounterHidden ? "" : html`<sm-step-counter .currentStepCount="${this.currentStepCount}" ?isTimer="${this.isStepCounterTimer}" .max="${this.max}"></sm-step-counter>`}

            ${this.isLoaderHidden ? "" : html`<sm-loader .statusText="${this.loaderText}"></sm-loader>`}

            ${this.isResultBoxHidden ? "" : html`<sm-result-box .resultType="${this.resultType}" .title="${this.resultTitle}" .message="${this.resultMessage}"></sm-result-box>`}
        `;
    }
}

customElements.define('sm-screen', SMScreen);