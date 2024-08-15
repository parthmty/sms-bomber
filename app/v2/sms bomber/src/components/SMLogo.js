import { LitElement, html, css } from 'lit-element';
import logo from '../assets/images/logo.svg';

export class SMLogo extends LitElement {
    static styles = css`
        div {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        img{
            height: 26px;
        }

        p{
            font-size: 16px;
            font-weight: bold;
            color: var(--tertiary);
        }
    `

    render() {
        return html`
            <div>
                <img src="${logo}" alt="SMS Bomber Logo">
                <p>SMS Bomber</p>
            </div>
        `;
    }
}

customElements.define('sm-logo', SMLogo);