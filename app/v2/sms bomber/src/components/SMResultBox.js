import { LitElement, html, css } from 'lit-element';

export class SMResultBox extends LitElement {
    static properties = {
        resultType: { type: String },
        title: { type: String },
        message: { type: String }
    }

    constructor() {
        super();
        this.resultType = "";
        this.title = "...";
        this.message = "...";
    }

    static styles = css`

        :host {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px;
            width: 100%;
            text-align: center;
            height: 100%;
            margin-top: 45%;
        }

        .hidden{
            display: none;
        }

        svg{
            width: 84px;
            height: 84px;
        }

        p{
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 0;
            color: var(--on-surface);
        }

        span{
            font-size: 14px;
            font-weight: normal;
            color: var(--on-surface-variant);
            width: 100%;
            max-width: 320px;
            line-height: 24px;
            margin-top: 4px;
        }

        .success path:nth-child(1){
            fill: var(--primary-container);
        }
        .success path:nth-child(2){
            fill: var(--on-primary-container);
        }

        .fail path:nth-child(1){
            fill: var(--error-container);
        }
        .fail path:nth-child(2){
            fill: var(--on-error-container);
        }
    `

    render() {
        return html`
        <svg viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" class="success ${this.resultType == 'success' ? '' : 'hidden'}">
            <g>
                <path d="M83.6666 42C83.6666 65.0105 65.0103 83.6667 41.9999 83.6667C18.9895 83.6667 0.333252 65.0105 0.333252 42C0.333252 18.9896 18.9895 0.333374 41.9999 0.333374C65.0103 0.333374 83.6666 18.9896 83.6666 42Z" />
                <path d="M64.0876 22.4208L35.7501 50.7479L24.0793 39.0854L18.2522 44.9124L35.7501 62.4187L69.9126 28.2479L64.0876 22.4208Z" />
            </g>
        </svg>
        <svg viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" class="fail ${this.resultType == 'fail' ? '' : 'hidden'}">
            <g>
                <path d="M42 0C18.8405 0 0 18.8405 0 42C0 65.1595 18.8405 84 42 84C65.1595 84 84 65.1595 84 42C84 18.8405 65.1595 0 42 0Z" />
                <path d="M57.4665 52.5175C58.835 53.886 58.835 56.098 57.4665 57.4665C56.784 58.149 55.888 58.492 54.992 58.492C54.096 58.492 53.2 58.149 52.5175 57.4665L42 46.949L31.4825 57.4665C30.8 58.149 29.904 58.492 29.008 58.492C28.112 58.492 27.216 58.149 26.5335 57.4665C25.165 56.098 25.165 53.886 26.5335 52.5175L37.051 42L26.5335 31.4825C25.165 30.114 25.165 27.902 26.5335 26.5335C27.902 25.165 30.114 25.165 31.4825 26.5335L42 37.051L52.5175 26.5335C53.886 25.165 56.098 25.165 57.4665 26.5335C58.835 27.902 58.835 30.114 57.4665 31.4825L46.949 42L57.4665 52.5175Z" />
            </g>
        </svg>

        <p>${this.title}</p>
        <span>${this.message}</span>
        
        `
    }
}

customElements.define('sm-result-box', SMResultBox);