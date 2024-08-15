import { LitElement, html, css } from 'lit-element';

export class SMLoader extends LitElement {

  static properties = {
    statusText: { type: String }
  }

  constructor() {
    super();
    this.statusText = "...";
  }

  static styles = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        margin-top: 70%;
        width: 100%;
        height: 100%;
    }

    .custom-loader {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: 
          radial-gradient(farthest-side,var(--outline) 94%,#0000) top/8px 8px no-repeat,
          conic-gradient(#0000 30%,var(--outline));
        -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
        animation:s3 1s infinite linear;
      }
      
      @keyframes s3{ 
        100%{transform: rotate(1turn)}
      }

      p{
        font-size: 14px;
        font-weight: bold;
        font-color: var(--on-surface);
        text-align: center;
      }
    `

  render() {
    return html`
            <div class="custom-loader"></div>
            <p>${this.statusText}</p>
        `;

  }
}

customElements.define('sm-loader', SMLoader);