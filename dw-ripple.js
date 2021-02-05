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
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';


export class DwRipple extends Ripple {
  static get styles() {
    return [
      super.styles,
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

  static get properties() {
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

  constructor() {
    super();
    this.primary = false;
    this.secondary = false;
    this.disabled = false;
    this.__init();
  }

  __init() {
    this._rippleHander = new RippleHandlers(async () => this);
    const parent = this.parentNode;
    this.__onMouseDown = this.__onMouseDown.bind(this);
    this.__onTouchStart = this.__onTouchStart.bind(this);
    this.__onMouseUp = this.__onMouseUp.bind(this);
    this.__onTouchEnd = this.__onTouchEnd.bind(this);

    parent.addEventListener('mouseenter', this._rippleHander.startHover);
    parent.addEventListener('mouseleave', this._rippleHander.endHover);
    parent.addEventListener('mousedown', this.__onMouseDown);
    parent.addEventListener('touchstart', this.__onTouchStart);
    parent.addEventListener('focus', this._rippleHander.startFocus);
    parent.addEventListener('blur', this._rippleHander.endFocus);
  }

  __onMouseDown(e) {
    window.addEventListener('mouseup', this.__onMouseUp);
    this._rippleHander.startPress(e);
  }

  __onTouchStart(e) {
    window.addEventListener('touchend', this.__onTouchEnd);
    this._rippleHander.startPress(e);
  }

  __onMouseUp() {
    window.removeEventListener('mouseup', this.__onMouseUp);
    this._rippleHander.endPress();
  }

  __onTouchEnd() {
    window.removeEventListener('touchend', this.__onTouchEnd);
    this._rippleHander.endPress();
  }

  disconnectedCallback() {
    const parent = this.parentNode;
    console.log('disconne', parent)
    parent.removeEventListener('mouseenter', this._rippleHander.startHover);
    parent.removeEventListener('mouseleave', this._rippleHander.endHover);
    
    parent.removeEventListener('mousedown', this.__onMouseDown);
    parent.removeEventListener('touchstart', this.__onTouchStart);
    parent.removeEventListener('focus', this._rippleHander.startFocus);
    parent.removeEventListener('blur', this._rippleHander.endFocus);

    window.removeEventListener('touchend', this.__onTouchEnd);
    window.removeEventListener('mouseup', this.__onMouseUp);

    super.disconnectedCallback();
  }

}

window.customElements.define('dw-ripple', DwRipple);
