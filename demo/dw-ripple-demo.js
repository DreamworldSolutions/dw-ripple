import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';

//These are the dw element needed by this element.
import '../dw-ripple.js';

// These are the dw styles element needed by this element.
import { ThemeStyle } from '@dreamworld/material-styles/theme.js';

//These are the mwc element needed by this element.
import '@material/mwc-switch';
import '@material/mwc-formfield';

export class DwRippleDemo extends LitElement {
  static get styles() {
    return [
      ThemeStyle,
      css`
       :host {
          display:block;
          color: var(--mdc-theme-text-primary);
        }

        section.main {
          padding: 24px;
        }

        h2 {
          margin: 20px 20px 0px 20px;
        }

        .demo-box {
          width: 96px;
          height: 96px;
          border: 1px solid gray;
          display: inline-flex;
          justify-content: center;
          text-align: center;
          flex-direction: column;
          padding: 8px;
          margin: 20px;
          position: relative;
        }

        .demo-box.custom {
          --mdc-theme-on-surface: #c11e5c;
        }

        mwc-formfield {
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }
      `
    ]
  }

  render() {
    return html`
      <section class="main">
        <mwc-formfield label="Enable dark theme">
          <mwc-switch @change="${(e) => {
              if (e.target.checked) {
                this.setAttribute('dark-theme', e.detail);
                return;
              }
              this.removeAttribute('dark-theme');
            }}">
          </mwc-switch>
        </mwc-formfield>
      
        <h2>Ripple</h2>
        <div class="demo-box">
          Default
          <dw-ripple></dw-ripple>
        </div>
        <div class="demo-box">
          Primary
          <dw-ripple primary></dw-ripple>
        </div>
        <div class="demo-box">
          Secondary
          <dw-ripple secondary></dw-ripple>
        </div>
        <div class="demo-box custom">
            Custom
            <dw-ripple></dw-ripple>
          </div>
        <div class="demo-box">
          unbounded
          <dw-ripple unbounded></dw-ripple>
        </div>
        <div class="demo-box">
          disabled
          <dw-ripple disabled></dw-ripple>
        </div>
      </section>
    `;
  }

}
window.customElements.define('dw-ripple-demo', DwRippleDemo);
