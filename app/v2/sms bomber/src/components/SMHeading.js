import { LitElement, html, css } from 'lit-element';

export class SMHeading extends LitElement {
    static properties = {
        heading: { type: String }
    }

    constructor() {
        super();
        this.heading = '';
    }

    static styles = css`
        h1 {
            width: 100%;
            font-size: 32px;
            font-weight: bold;
            color: var(--on-surface);
        }
    `

    render() {
        return html`
            <h1>${this.heading}</h1>
        `;
    }
}

customElements.define('sm-heading', SMHeading);