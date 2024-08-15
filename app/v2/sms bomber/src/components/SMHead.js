import { LitElement, html, css } from 'lit-element';
import { SMStepProgress } from './SMStepProgress.js';
import { SMLogo } from './SMLogo.js';

export class SMHead extends LitElement {
    static properties = {
        progress: { type: Number }
    }

    constructor() {
        super();
        this.progress = 25;
    }

    static styles = css`
        :host{
            width: 100%;
        }
        header{
            display: flex;
            flex-direction: column;
            padding: 16px;
            gap: 12px;
            box-sizing: border-box;
            width: 100%;
        }
    `

    render() {
        return html`
            <header>
                <sm-logo></sm-logo>
                <sm-step-progress .completed="${this.progress}"></sm-step-progress>
            </header>
        `;
    }
}

customElements.define('sm-head', SMHead);