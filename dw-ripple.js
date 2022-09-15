import { css } from "lit-element";

// These are the mwc element needed by this element.
import { Ripple } from "@material/mwc-ripple";
import { RippleHandlers } from "@material/mwc-ripple/ripple-handlers";

export class DwRipple extends Ripple {
  static get styles() {
    return [
      super.styles,
      css`
        :host([secondary]) {
          --mdc-ripple-color: var(--mdc-theme-secondary);
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Set to `true` when ripple is to be shown in secondary color
       */
      secondary: { type: Boolean, reflect: true },

      /**
       * Set to `true` to disable hover and focuse in.
       */
      disableHover: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.primary = false;
    this.secondary = false;
    this.disableHover = false;
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

    if (!this.disableHover) {
      parent.addEventListener("mouseenter", this._rippleHander.startHover);
      parent.addEventListener("mouseleave", this._rippleHander.endHover);
      parent.addEventListener("focus", this._rippleHander.startFocus);
      parent.addEventListener("blur", this._rippleHander.endFocus);
    }

    parent.addEventListener("mousedown", this.__onMouseDown);
    parent.addEventListener("touchstart", this.__onTouchStart);
  }

  __onMouseDown(e) {
    window.addEventListener("mouseup", this.__onMouseUp);
    this._rippleHander.startPress(e);
  }

  __onTouchStart(e) {
    window.addEventListener("touchend", this.__onTouchEnd);
    this._rippleHander.startPress(e);
  }

  __onMouseUp() {
    window.removeEventListener("mouseup", this.__onMouseUp);
    this._rippleHander.endPress();
  }

  __onTouchEnd() {
    window.removeEventListener("touchend", this.__onTouchEnd);
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
      if (!this.disableHover) {
        parent.removeEventListener("mouseenter", this._rippleHander.startHover);
        parent.removeEventListener("mouseleave", this._rippleHander.endHover);
        parent.removeEventListener("focus", this._rippleHander.startFocus);
        parent.removeEventListener("blur", this._rippleHander.endFocus);
      }

      parent.removeEventListener("mousedown", this.__onMouseDown);
      parent.removeEventListener("touchstart", this.__onTouchStart);
    }

    window.removeEventListener("touchend", this.__onTouchEnd);
    window.removeEventListener("mouseup", this.__onMouseUp);

    super.disconnectedCallback();
  }
}

window.customElements.define("dw-ripple", DwRipple);
