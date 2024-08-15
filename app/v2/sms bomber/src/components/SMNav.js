import { LitElement, html, css } from 'lit-element';
import { SMButton } from './SMButton.js';

export class SMNav extends LitElement {
    static properties = {
        isBackDisabled: { type: Boolean },
        isNextDisabled: { type: Boolean },
        isCancelDisabled: { type: Boolean },
        isHomeDisabled: { type: Boolean },
        isBombDisabled: { type: Boolean },
        isBackHidden: { type: Boolean },
        isNextHidden: { type: Boolean },
        isCancelHidden: { type: Boolean },
        isHomeHidden: { type: Boolean },
        isBombHidden: { type: Boolean },
        currentStep: { type: Number }
    }

    constructor() {
        super();
        this.isBackDisabled = true;
        this.isNextDisabled = true;
        this.isCancelDisabled = true;
        this.isHomeDisabled = true;
        this.isBombDisabled = true;
        this.isBackHidden = true;
        this.isNextHidden = true;
        this.isCancelHidden = true;
        this.isHomeHidden = true;
        this.isBombHidden = true;
    }

    static styles = css`
        :host{
            width: 100%;
        }
        nav{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 110px;
            gap: 8px;
            background-color: var(--inverse-on-surface);
        }

        @media (max-height: 530px){
            nav{
                height: 60px;
            }
        }

        @media (max-height: 475px){
            nav{
                display: none;
            }
        }
    `

    handleBackClick() {
        if (!this.isBackDisabled) {
            this.dispatchEvent(new CustomEvent('button-click', {
                detail: {
                    type: 'back',
                    currentStep: this.currentStep - 1
                }
            }));
        }
    }

    handleCancelClick() {
        if (!this.isCancelDisabled) {
            this.dispatchEvent(new CustomEvent('button-click', {
                detail: {
                    type: 'cancel',
                    currentStep: 5
                }
            }));
        }
    }

    handleNextClick() {
        if (!this.isNextDisabled | !this.isBombDisabled) {
            this.dispatchEvent(new CustomEvent('button-click', {
                detail: {
                    type: 'next',
                    currentStep: this.currentStep + 1
                }
            }));
        }
    }

    handleHomeClick() {
        if (!this.isHomeDisabled) {
            this.dispatchEvent(new CustomEvent('button-click', {
                detail: {
                    type: 'home',
                    currentStep: 1
                }
            }));
        }
    }

    render() {
        return html`
            <nav>
                <sm-button class="back" type="back" ?disabled="${this.isBackDisabled}" ?hidden="${this.isBackHidden}" @click="${this.handleBackClick}"></sm-button>
                <sm-button class="cancel" type="cancel" ?disabled="${this.isCancelDisabled}" ?hidden="${this.isCancelHidden}" @click="${this.handleCancelClick}"></sm-button>
                <sm-button class="next" type="next" ?disabled="${this.isNextDisabled}" ?hidden="${this.isNextHidden}" @click="${this.handleNextClick}"></sm-button>
                <sm-button class="home" type="home" ?disabled="${this.isHomeDisabled}" ?hidden="${this.isHomeHidden}" @click="${this.handleHomeClick}"></sm-button>
                <sm-button class="bomb" type="bomb" ?disabled="${this.isBombDisabled}" ?hidden="${this.isBombHidden}" @click="${this.handleNextClick}"></sm-button>
            </nav>
        `;
    }
}

customElements.define('sm-nav', SMNav);