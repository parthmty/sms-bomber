import { LitElement, html, css, unsafeCSS } from 'lit-element';

export class SMStepProgress extends LitElement {
    static properties = {
        completed: { type: Number }
    }

    constructor() {
        super();
        this.completed = 25
    }

    static styles = css`
        :host{
            display: flex;
            gap: 4px;
            width: 100%;
        }

        div {
            height: 4px;
            border-radius: 1000px;
        }
        
        .filled {
            width: 25%;
            background-color: var(--inverse-primary);
        }

        .empty {
            flex: 1;
            background-color: var(--surface-variant);
        }
    `

    updated(changedProperties) {
        if (changedProperties.has('completed')) {
            this.shadowRoot.querySelector('.filled').style.width = this.completed + '%';
        }
    }

    render() {
        return html`
            <div class="filled"></div>
            <div class="empty"></div>            
        `;
    }
}

customElements.define('sm-step-progress', SMStepProgress);