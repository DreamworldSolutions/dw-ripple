/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css } from 'lit-element';

// These are the mwc element needed by this element.
import { Ripple } from '@material/mwc-ripple';


export class DWRipple extends Ripple {
  static get styles() {
    return [
      Ripple.styles,
      css`
      :host([disabled]) {
        --mdc-theme-on-surface: transparent;
      }

      :host([primary]) {
        --mdc-theme-on-surface: var(--mdc-theme-primary);
      }

      :host([secondary]) {
        --mdc-theme-on-surface: var(--mdc-theme-secondary);
      }
      
      .mdc-ripple-surface::before, .mdc-ripple-surface::after {
        background-color: var(--mdc-theme-on-surface, #000);
      }
      `
    ];
  }

  static get properties(){
    return {

      /**
       * Set to `true` when ripple is to be shown in primary color.
       */
      primary: { type: Boolean, reflect: true },

      /**
       * Set to `true` when ripple is to be shown in secondary color
       */
      secondary: { type: Boolean, reflect: true },

      /**
       * Set to `true` if ripple should not be shown
       */
      disabled: { type: Boolean, reflect: true }
    }
  }

  constructor(){
    super();
    this.primary=false;
    this.secondary = false;
    this.disabled = false;
  }

}

window.customElements.define('dw-ripple', DWRipple);
