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
        border-radius: 50%;
        transform: scale(0);
        opacity: .25;
        background-color: var(--dw-ripple-color, var(--mdc-theme-on-surface));
      }

      :host([disabled]) {
        background-color: transparent;
      }

      :host(:not([unbounded])[active]) {
        animation-name: ripple;
        animation-duration: 350ms;  
        animation-timing-function: linear;
      }

      :host([unbounded][active]) {
        animation-name: unbounded-ripple;
        animation-duration: 350ms;  
        animation-timing-function: ease;
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
          opacity: 0;
        }
      }


      @keyframes unbounded-ripple {
        to {
          transform: scale(1);
          opacity: 0;
        }
      }
      `
    ];
  }

  static get properties(){
    return {

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
    this.__activeRipple = this.__activeRipple.bind(this);
  }


  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    if(this.parentNode) {
      this.parentNode.addEventListener('click', this.__activeRipple);
    }
  }

  disconnectedCallback() {
    if(this.parentNode) {
      this.parentNode.removeEventListener('click', this.__activeRipple);
    }
    super.disconnectedCallback && super.disconnectedCallback();
  }

  render() {
    return html`
    `;
  }


  /**
   * Active ripple on button click event.
   * @private
   */
  __activeRipple(event) {
    let button = event.currentTarget;

    //If parent is not found;
    if(!button) {
      console.warn('Ripple button is not found');
      return;
    }

    this.removeAttribute('active');

    let diameter = Math.max(button.clientWidth, button.clientHeight);
    let radius = diameter / 2;
    
    let top = 0;
    let left = 0;

    if(!this.unbounded) {
      top = event.clientY - button.offsetTop - radius;
      left = event.clientX - button.offsetLeft - radius;
    }

    //Change ripple styles
    this.style.position = 'absolute';
    this.style.width = this.style.height = `${diameter}px`;
    this.style.left = `${left}px`;
    this.style.top = `${top}px`;

    //Add attribute for active ripple animation.
    this.setAttribute('active', '');
  }
}

window.customElements.define('dw-ripple', DwRipple);
