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
        :host([disabled]) .mdc-ripple-surface::before, .mdc-ripple-surface::after {
          background-color: transparent;
        }
        .mdc-ripple-surface::before, .mdc-ripple-surface::after {
          background-color: var(--mdc-theme-on-surface, #000);
        }
        :host([primary]) .mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after{
          background-color: var(--mdc-theme-primary);
        }
        :host([secondary]) .mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {
          background-color: var(--mdc-theme-secondary);
        }
      `
    ];
  }

  static get properties(){
    return {

      /**
       * `true` if ripple is shown on secondary color
       */
      secondary: { type: Boolean, reflect: true },

      /**
       * `true` if ripple is not shown
       */
      disabled: { type: Boolean, reflect: true }
    }
  }

  constructor(){
    super();
    this.secondary = false;
    this.disabled = false;
  }

  updated(changedProps){
    if(changedProps.has('secondary')){
      this.accent = this.secondary ? true : false;
    }
  }
}

window.customElements.define('dw-ripple', DWRipple);
