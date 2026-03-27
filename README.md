# dw-ripple

A Material Design ripple effect web component that extends [`@material/mwc-ripple`](https://github.com/material-components/material-components-web-components/tree/master/packages/ripple) with expanded theming support (`primary`, `secondary` attributes), device-aware input handling (touch vs. mouse), and scroll-cancel protection.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-ripple
```

Import the module to register the `<dw-ripple>` custom element:

```javascript
import '@dreamworld/dw-ripple/dw-ripple.js';
```

### Basic Usage

Place `<dw-ripple>` as a direct child of the element that should receive the ripple effect. The parent element must have `position: relative` so the ripple surface overlays it correctly.

```html
<div style="position: relative; width: 96px; height: 96px;">
  Default
  <dw-ripple></dw-ripple>
</div>
```

The component automatically attaches `mousedown`/`mouseup` (or `touchstart`/`touchend` on touch devices) listeners to the parent element — no JavaScript wiring is required.

### API Reference

#### Properties / Attributes

| Property | Type | Default | Reflected | Description |
|---|---|---|---|---|
| `primary` | `Boolean` | `false` | No | Display ripple in `--mdc-theme-primary` color. |
| `secondary` | `Boolean` | `false` | Yes | Display ripple in `--mdc-theme-secondary` color. |
| `disabled` | `Boolean` | `false` | No | Suppress ripple (sets ripple color to `transparent`). Inherited from `mwc-ripple`. |
| `unbounded` | `Boolean` | `false` | No | Ripple radiates from the center in a circular shape regardless of click position. Inherited from `mwc-ripple`. |
| `selected` | `Boolean` | `false` | No | Apply selected visual state. Inherited from `mwc-ripple`. |
| `activated` | `Boolean` | `false` | No | Apply activated visual state. Inherited from `mwc-ripple`. |
| `disableHover` | `Boolean` | `false` | No | Skip attaching `mouseenter`/`mouseleave`/`focus`/`blur` handlers, removing hover and focus feedback. |

> Properties `primary`, `disabled`, `unbounded`, `selected`, and `activated` are defined by the parent class `@material/mwc-ripple`. They are listed here for completeness.

#### CSS Custom Properties

| Property | Default | Description |
|---|---|---|
| `--mdc-theme-on-surface` | `#000` | Base ripple color. Automatically overridden by `primary`, `secondary`, and `disabled` host-attribute rules. |
| `--mdc-theme-primary` | — | Color applied when the `primary` attribute is present. |
| `--mdc-theme-secondary` | — | Color applied when the `secondary` attribute is present. |
| `--mdc-ripple-border-radius` | `0` | Border radius of `.mdc-ripple-surface`. Set this to match the border radius of the parent container. |

**No custom events or slots are defined by this component.**

### Configuration Options

| Option | Where | Description |
|---|---|---|
| Custom ripple color | CSS on parent | Set `--mdc-theme-on-surface` on the parent element to use a custom color without `primary`/`secondary` attributes. |
| Border radius | CSS on parent | Set `--mdc-ripple-border-radius` on the parent element to clip the ripple to a rounded container. |

### Advanced Usage

#### Theming with a Custom Color

```html
<style>
  .my-button {
    position: relative;
    --mdc-theme-on-surface: #c11e5c;
  }
</style>

<div class="my-button">
  Custom Color
  <dw-ripple></dw-ripple>
</div>
```

#### Rounded / Pill Containers

```html
<style>
  .chip {
    position: relative;
    border-radius: 16px;
    --mdc-ripple-border-radius: 16px;
  }
</style>

<div class="chip">
  Label
  <dw-ripple></dw-ripple>
</div>
```

#### Unbounded Ripple (Icon Buttons)

```html
<div style="position: relative; width: 48px; height: 48px;">
  <dw-ripple unbounded></dw-ripple>
</div>
```

#### Suppressing Hover / Focus Feedback

```html
<div style="position: relative;">
  <dw-ripple disableHover></dw-ripple>
</div>
```

#### Running the Demo

```bash
yarn start
```

Starts `@web/dev-server` with hot-reload, opening `demo/index.html` in the browser.

---

## 2. Developer Guide / Architecture

### Architecture Overview

`DwRipple` is a thin subclass of `@material/mwc-ripple`. It overrides three concerns only:

| Concern | Implementation |
|---|---|
| **Theming** | CSS host-attribute selectors remap `--mdc-theme-on-surface` based on `primary`, `secondary`, `disabled` attributes. |
| **Event Wiring** | `connectedCallback` attaches interaction listeners to the **parent element** (not `<dw-ripple>` itself), so the ripple reacts to user interaction on the containing element. |
| **Device Awareness** | A module-level constant `isTouch = DeviceInfo.info().touch` selects between `mousedown/mouseup` and `touchstart/touchend` at load time. |

### Design Patterns

1. **Class Extension** — inherits all rendering and animation logic from `mwc-ripple`; `DwRipple` adds only theming and event management.

2. **Parent-targeted Event Delegation** — `__init()` walks up to `this.parentNode` (unwrapping `ShadowRoot` to `.host` when necessary) and registers all input events there. `disconnectedCallback` removes them, ensuring no memory leaks.

3. **Scroll-Cancel Guard** — a global `touchmove` listener (registered once at module load) clears the 50 ms press-start timeout. This prevents a ripple from firing when the user is scrolling.

    ```javascript
    window.addEventListener("touchmove", () => {
      if (rippleTimeout) {
        clearTimeout(rippleTimeout);
        rippleTimeout = null;
      }
    });
    ```

4. **Deferred Press Start (50 ms timeout)** — both `__onMouseDown` and `__onTouchStart` delay calling `_rippleHander.startPress()` by 50 ms. Combined with the scroll-cancel guard, this avoids spurious ripples during selection or fast scrolling.

5. **CSS Custom Properties Cascade** — `primary`/`secondary`/`disabled` state is expressed purely in CSS via `:host([attr])` selectors, keeping property logic out of JavaScript.

### Module Responsibilities

| File | Responsibility |
|---|---|
| [dw-ripple.js](dw-ripple.js) | Component definition, event wiring, theming, custom element registration. |
| [demo/dw-ripple-demo.js](demo/dw-ripple-demo.js) | Interactive demo showcasing all property combinations; not part of the published API. |

### Dependencies

| Package | Role |
|---|---|
| `@material/mwc-ripple` `0.27.0` | Base `Ripple` class and `RippleHandlers` animation controller. |
| `@dreamworld/device-info` `^1.3.2` | Touch-capability detection (`DeviceInfo.info().touch`). |
| `@dreamworld/pwa-helpers` `^1.16.5` | Re-exports `css` tagged template literal from LitElement. |
