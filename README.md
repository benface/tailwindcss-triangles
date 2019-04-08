# Triangles Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-triangles
```

## Usage

```js
// tailwind.config.js
{
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
  plugins: [
    require('tailwindcss-triangles')({
      componentPrefix: 'c-',        // defaults to 'c-'
      defaultSize: '1em',           // defaults to '1em'
      defaultColor: 'currentColor', // defaults to 'currentColor'
    }),
  ],
}
```

The above configuration would generate the following CSS:

```css
.c-triangle-left {
  width: 0;
  height: 0;
  border-right: .5em solid currentColor;
  border-top: .5em solid transparent;
  border-bottom: .5em solid transparent;
}
```
