# dw-ripple

Shows ripple effect on the click of the parent element. By default ripple is shown in the on-surface color. But, you have options to show it either in the primary, secondary or even any other color.

## Installation

```html
	npm install @dw/dw-ripple
```

## Usage
- Apply `position: relative;` and `overflow: hidden;` styles to ripple parent. Please see below example

```html
    @import '@dw/dw-ripple/dw-ripple';
		
		.demo-box {
			position: relative;
			overflow: hidden;
			width: 96px;
			height: 96px;
			border: 1px solid gray;
		}
		
    <div class="demo-box">
			Default
			<dw-ripple></dw-ripple>
    </div>
```

## [Demo](https://dreamworldsolutions.github.io/dw-ripple/demo/index.html)

## Properties
- `primary` Set when ripple is to be shown in primary color.
- `secondary` Set when ripple is to be shown in secondary color.
- `disabled` Boolean. Set when disabled. e.g. When icon-button is disabled, no ripple is to be shown.
- `unbounded` Boolean. By defualt ripple effect are shown from the point where user clicks. If we want to show ripple always from the center (irrespective of the click position) then set to `true`. When this is set, ripple is shown in circular shape always.

## Theming
- `color`: By default ripple is shown in `--mdc-theme-on-surface`. That should be ok for most places. When need to change it at special place, change host background-color css property of dw-ripple OR set `--dw-ripple-color` CSS property to any other color

- `opacity`: By default ripple opacity is 0.20, That should be ok for most places. when need to change it special place, then directly change host opacity of dw-ripple.
