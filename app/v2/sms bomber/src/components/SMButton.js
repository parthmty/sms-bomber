import { LitElement, html, css } from 'lit-element';

export class SMButton extends LitElement {
    static properties = {
        type: { type: String },
        disabled: { type: Boolean },
    }

    constructor() {
        super();
        this.type = '';
        this.disabled = false;
    }

    static styles = css`
        button {
            width: 120px;
            height: 40px;
            border-radius: 1000px;
            outline: none;
            border: none;

            font-size: 14px;
            font-weight: bold;

            display: flex;
            justify-content: center;
            align-items: center;

            box-shadow: var(--el1);
        }

        .next {
            background-color: var(--secondary);
            color: var(--on-secondary);
        }

        .bomb{
            background-color: var(--primary);
            color: var(--on-tertiary);
        }

        .back {
            background-color: transparent;
            color: var(--secondary);
            border: 1px solid var(--secondary);
        }

        .cancel {
            background-color: var(--error);
            color: var(--on-error);
        }

        button:disabled {
            background-color: var(--outline-variant);
            color: var(--outline);
            cursor: not-allowed;
            box-shadow: none;
            border: none;
        }
    `;

    render() {
        let buttonText = this.type;
        buttonText = buttonText.charAt(0).toUpperCase() + buttonText.slice(1);
        return html`<button class="${this.type}" ?disabled="${this.disabled}" @click="${this._handleClick}">${buttonText}</button>`;
    }
}

customElements.define('sm-button', SMButton);