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
      disabled: { type: Boolean, reflect: true },

      /**
       * Set to `true` to show hover or focuse in ripple
       */
      enableHover: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.primary = false;
    this.secondary = false;
    this.disabled = false;
    this.enableHover = false;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.__init();
  }

  __init() {
    this._rippleHander = new RippleHandlers(async () => this);
    const parent = this.__getParentNode();
    this.__onMouseDown = this.__onMouseDown.bind(this);
    this.__onTouchStart = this.__onTouchStart.bind(this);
    this.__onMouseUp = this.__onMouseUp.bind(this);
    this.__onTouchEnd = this.__onTouchEnd.bind(this);

    if(this.enableHover) {
      parent.addEventListener('mouseenter', this._rippleHander.startHover);
      parent.addEventListener('mouseleave', this._rippleHander.endHover);
      parent.addEventListener('focus', this._rippleHander.startFocus);
      parent.addEventListener('blur', this._rippleHander.endFocus);
    }

    parent.addEventListener('mousedown', this.__onMouseDown);
    parent.addEventListener('touchstart', this.__onTouchStart);
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

  __getParentNode() {
    let parent = this.parentNode;
    if (parent instanceof ShadowRoot) {
      parent = parent.host;
    }
    return parent;
  }

  disconnectedCallback() {
    const parent = this.__getParentNode();
    if (parent) {

      if(this.enableHover) {
        parent.removeEventListener('mouseenter', this._rippleHander.startHover);
        parent.removeEventListener('mouseleave', this._rippleHander.endHover);
        parent.removeEventListener('focus', this._rippleHander.startFocus);
        parent.removeEventListener('blur', this._rippleHander.endFocus);
      }

      parent.removeEventListener('mousedown', this.__onMouseDown);
      parent.removeEventListener('touchstart', this.__onTouchStart);
    }

    window.removeEventListener('touchend', this.__onTouchEnd);
    window.removeEventListener('mouseup', this.__onMouseUp);

    super.disconnectedCallback();
  }

}

window.customElements.define('dw-ripple', DwRipple);
