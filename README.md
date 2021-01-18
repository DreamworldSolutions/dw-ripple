# dw-ripple

Ripple element created as child-class of [`mwc-ripple`]
(https://github.com/material-components/material-components-web-components/tree/master/packages/ripple)

## What are the changes in `mwc-ripple`?
- To show ripple in secondary color, they have used property named `accent`. Which is confusing in terms of standard 
theming variables.
- They render ripple always in black color by default. So, it doesn't work on dark theme. We changed default color to 
`--mdc-theme-on-surface`

## Installation

```html
	npm install @dw/dw-ripple
```

## Usage

```html
    @import '@dw/dw-ripple/dw-ripple';
		
		.demo-box {
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
- `primary` Boolean. Set when ripple is to be shown in primary color.
- `secondary` Boolean, Set when ripple is to be shown in secondary color.
- `disabled` Boolean. Set when disabled. e.g. When icon-button is disabled, no ripple is to be shown.
- `unbounded` Boolean. By defualt ripple effect are shown from the point where user clicks. If we want to show ripple 
always from the center (irrespective of the click position) then set to `true`. When this is set, ripple is shown in 
circular shape always.

## Theming
By default ripple is shown in `--mdc-theme-on-surface`. That should be ok for most places. When need to change it at
special place, set said CSS property to any other color.


it's opacity can't be configured as of now. If needed please raise a feature request.