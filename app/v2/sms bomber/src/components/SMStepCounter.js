import { LitElement, html, css } from 'lit-element';

export class SMStepCounter extends LitElement {
    static properties = {
        stepCount: { type: Number },
        isTimer: { type: Boolean },
        min: { type: Number },
        max: { type: Number }
    }

    constructor() {
        super();
        this.stepCount = 1;
        this.isTimer = false;
        this.min = 1;
        this.max = 50;
    }

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 16px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 90px;
        }

        .stepbox{
            display: flex;
            align-items: flex-end;
            gap: 8px;
            padding: 12px 16px;
            border-radius: 16px;
            background-color: var(--surface-variant);
            font-size: 36px;
            line-height: 44px;
            font-weight: bold;
            color: var(--on-surface-variant);
            min-width: 50px;
            justify-content: center;
        }

        .stepbox *{
            padding: 0;
            margin: 0;
        }

        span{
            color: var(--outline);
            font-size: 28px;
            line-height: 40px;
        }
        svg{
            height: 60px;
        }

        svg path[opacity="0.35"]{
            fill: var(--tertiary-container);
        }

        svg path{
            fill: var(--on-tertiary-container);
        }
    `

    handleDecrement() {
        if (this.stepCount > this.min) {
            this.stepCount--;
        }

        this._sendCounterValue();
    }

    handleIncrement() {
        if (this.stepCount < this.max) {
            this.stepCount++;
        }

        this._sendCounterValue();
    }

    _sendCounterValue() {
        this.dispatchEvent(new CustomEvent('counter-change', {
            detail: {
                isTimer: this.isTimer,
                value: this.stepCount
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <svg @click="${this.handleDecrement}" id="decrementer" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                <path opacity="0.35" d="M30 59.7618C46.437 59.7618 59.7619 46.437 59.7619 29.9999C59.7619 13.5629 46.437 0.238037 30 0.238037C13.563 0.238037 0.238098 13.5629 0.238098 29.9999C0.238098 46.437 13.563 59.7618 30 59.7618Z" />
                <path d="M44.881 32.9762H15.1191C13.4762 32.9762 12.1429 31.6429 12.1429 30C12.1429 28.3571 13.4762 27.0238 15.1191 27.0238H44.881C46.5238 27.0238 47.8572 28.3571 47.8572 30C47.8572 31.6429 46.5238 32.9762 44.881 32.9762Z" />
                </g>
            </svg> 
            <div class="stepbox">
                <p class="step">${this.stepCount}</p>
                <span ?hidden="${!this.isTimer}">s</span>
            </div>
            <svg @click="${this.handleIncrement}" id="incrementer" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                <path opacity="0.35" d="M30 59.8076C46.4623 59.8076 59.8076 46.4623 59.8076 30C59.8076 13.5376 46.4623 0.192261 30 0.192261C13.5376 0.192261 0.192261 13.5376 0.192261 30C0.192261 46.4623 13.5376 59.8076 30 59.8076Z" />
                <path d="M44.9038 27.0192H35.9615C34.3161 27.0192 32.9807 25.6838 32.9807 24.0384V15.0961C32.9807 13.4507 31.6454 12.1154 30 12.1154C28.3546 12.1154 27.0192 13.4507 27.0192 15.0961V24.0384C27.0192 25.6838 25.6838 27.0192 24.0384 27.0192H15.0961C13.4507 27.0192 12.1154 28.3546 12.1154 30C12.1154 31.6454 13.4507 32.9807 15.0961 32.9807H24.0384C25.6838 32.9807 27.0192 34.3161 27.0192 35.9615V44.9038C27.0192 46.5492 28.3546 47.8846 30 47.8846C31.6454 47.8846 32.9807 46.5492 32.9807 44.9038V35.9615C32.9807 34.3161 34.3161 32.9807 35.9615 32.9807H44.9038C46.5492 32.9807 47.8846 31.6454 47.8846 30C47.8846 28.3546 46.5492 27.0192 44.9038 27.0192Z" />
                </g>
            </svg>
        `;
    }
}

customElements.define('sm-step-counter', SMStepCounter);