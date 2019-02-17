# Triangles Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-triangles
```

## Usage

```js
// In your Tailwind CSS config
{
  plugins: [
    require('tailwindcss-triangles')({
      prefix: 'c-triangle-',      // defaults to 'c-triangle-'
      defaultOptions: {},         // any of the options below that you want to apply to all triangles
      triangles: {
        'left': {
          direction: 'left',      // one of 'left', 'right', 'up', 'down', 'left-up', 'left-down', 'right-up', and 'right-down'
          size: '1em',            // defaults to '1em'
          height: '0.5em',        // defaults to half the specified size; has no effect on the diagonal directions (e.g. 'left-up')
          color: 'currentColor',  // defaults to 'currentColor'
        }
      },
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
