# Triangles Plugin for Tailwind CSS

## Requirements

This plugin requires Tailwind CSS 1.2 or later. If your project uses an older version of Tailwind, you should install the latest 2.x version of this plugin (`npm install tailwindcss-triangles@2.x`).

## Installation

```bash
npm install tailwindcss-triangles
```

## Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    triangles: {
      'left': {
        direction: 'left',      // one of 'left', 'right', 'up', 'down', 'left-up', 'left-down', 'right-up', and 'right-down'
        size: '1em',            // defaults to defaultSize
        height: '0.5em',        // defaults to half the size; has no effect on the diagonal directions (e.g. 'left-up')
        color: 'currentColor',  // defaults to defaultColor
      },
    },
  },
  variants: {
    triangles: ['responsive'], // defaults to []
  },
  plugins: [
    require('tailwindcss-triangles')({
      componentPrefix: 'c-',        // defaults to 'c-'
      defaultSize: '1em',           // defaults to '1em'
      defaultColor: 'currentColor', // defaults to 'currentColor'
    }),
  ],
};
```

The above configuration would generate the following CSS:

```css
.c-triangle-left {
  width: 0;
  height: 0;
  border: 0;
  border-right: .5em solid currentColor;
  border-top: .5em solid transparent;
  border-bottom: .5em solid transparent;
}

@media (min-width: 640px) {
  .sm\\:c-triangle-left {
    width: 0;
    height: 0;
    border: 0;
    border-right: .5em solid currentColor;
    border-top: .5em solid transparent;
    border-bottom: .5em solid transparent;
  }
}
```
