/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, html } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';

export class DwRipple extends LitElement {
  static get styles() {
    return [
      css`
      :host {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        opacity: .20;
        background-color: var(--dw-ripple-color, var(--mdc-theme-on-surface));
      }

      :host([disabled]) {
        background-color: transparent;
      }

      :host(:not([fadeout]):not([unbounded])[active-ripple]) {
        animation-name: ripple;
        animation-duration: 350ms;  
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      :host(:not([fadeout])[unbounded][active-ripple]) {
        animation-name: unbounded-ripple;
        animation-duration: 350ms;  
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      :host([fadeout]) {
        animation-name: fadeout;
        animation-duration: 350ms; 
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }
 
      :host([primary]) {
        --dw-ripple-color: var(--mdc-theme-primary);
      }

      :host([secondary]) {
        --dw-ripple-color: var(--mdc-theme-secondary);
      }

      @keyframes ripple {
        to {
          transform: scale(4);
        }
      }


      @keyframes unbounded-ripple {
        to {
          transform: scale(1);
        }
      }

      @keyframes fadeout {
        to { 
          opacity: 0;
        }
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
      disabled: { type: Boolean, reflect: true },

      /**
       * Set to true when ripple shows as an unbounded.
       */
      unbounded: { type: Boolean, reflect: true }
    }
  }

  constructor(){
    super();
    this.disabled = false;
    this.unbounded = false;
    this.__onStart = this.__onStart.bind(this);
    this.__fadeOut = this.__fadeOut.bind(this);

    /**
     * It's data-type is Promise. Default value is the Promise which is resolved immediately.
     * Later on, it's value will be changed when entry animation is started (__scale).
     * And when entry animation is completed, that promise gets resolved.
     */
    this.__waitForEntryAnimation = new Promise( (resolve) => {resolve()});
  }


  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.updateComplete.then(() => {
      this.__bindActiveEvents();
      this.__bindInactiveEvents();
    });
  }

  disconnectedCallback() {
    this.__unbindActiveEvents();
    this.__unbindInactiveEvents();
    super.disconnectedCallback && super.disconnectedCallback();
  }

  render() {
    return html`
    `;
  }


  /**
   * Bind active ripple events.
   * @private
   */
  __bindActiveEvents() {
    this.parentNode && this.parentNode.addEventListener('mousedown', this.__onStart);
    this.parentNode && this.parentNode.addEventListener('touchstart', this.__onStart);
  }

  /**
   * unbind active ripple events.
   * @private
   */
  __unbindActiveEvents() {
    this.parentNode && this.parentNode.removeEventListener('mousedown', this.__onStart);
    this.parentNode && this.parentNode.removeEventListener('touchstart', this.__onStart);
  }

  /**
   * Bind remove/in-active ripple events.
   * @private
   */
  __bindInactiveEvents() {
    this.parentNode && this.parentNode.addEventListener('mouseup', this.__fadeOut);
    this.parentNode && this.parentNode.addEventListener('mouseleave', this.__fadeOut);
    this.parentNode && this.parentNode.addEventListener('touchend', this.__fadeOut);
  }

  /**
   * unbind remove/in-active ripple events.
   * @private
   */
  __unbindInactiveEvents() {
    this.parentNode && this.parentNode.removeEventListener('mouseup', this.__fadeOut);
    this.parentNode && this.parentNode.removeEventListener('mouseleave', this.__fadeOut);
    this.parentNode && this.parentNode.removeEventListener('touchend', this.__fadeOut);
  }

  /**
   * Fade out a current active ripple.
   * Waits till the scale animation is completed, and then performs the fadeout animation
   * @private
   */
  __fadeOut() {
    this.__waitForEntryAnimation.then(() => {
      this.removeAttribute('active-ripple');
      this.setAttribute('fadeout', '');
    })
  }

  /**
   * Invoked on ripple active events.
   * Set's ripple top left position and active a ripple animation.
   * @private
   */
  __onStart(event) {
    let parentEl = event.currentTarget;

    let diameter = Math.max(parentEl.clientWidth, parentEl.clientHeight);
    let radius = diameter / 2;

    let top = 0;
    let left = 0;

    if(!this.unbounded) {
      top = event.clientY - parentEl.offsetTop - radius;
      left = event.clientX - parentEl.offsetLeft - radius;
    }

    //Change ripple styles
    this.style.width = this.style.height = `${diameter}px`;
    this.style.left = `${left}px`;
    this.style.top = `${top}px`;
    this.__scale();
  }

  /**
   * Performs entry (scale) animation.
   * @private
   */
  __scale() {
    this.removeAttribute('fadeout');

    let resolve, reject;
    let promise = new Promise((res, rej) => { resolve = res, reject = rej; });
    this.__waitForEntryAnimation = promise;

    //Add attribute for active-ripple ripple animation.
    this.setAttribute('active-ripple', '');
    setTimeout(() => {
      resolve();
    }, 350);
  }
}

window.customElements.define('dw-ripple', DwRipple);
