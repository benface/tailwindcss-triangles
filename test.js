const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const trianglesPlugin = require('./index.js');

const generatePluginCss = (options = {}) => {
  return postcss(tailwindcss({
    plugins: [trianglesPlugin(options)],
  })).process('@tailwind components;', {
    from: undefined,
  }).then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('there is no output by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(``);
  });
});

test('triangle options are not required', () => {
  return generatePluginCss({
    triangles: {
      'default': {}
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-default {
        width: 0;
        height: 0;
        border-left: .5em solid currentColor;
        border-top: .5em solid transparent;
        border-bottom: .5em solid transparent;
      }
    `);
  });
});

test('you can customize the prefix', () => {
  return generatePluginCss({
    prefix: 'triangle-',
    triangles: {
      'default': {}
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .triangle-default {
        width: 0;
        height: 0;
        border-left: .5em solid currentColor;
        border-top: .5em solid transparent;
        border-bottom: .5em solid transparent;
      }
    `);
  });
});

test('you can customize a triangle’s direction, size, height, and color', () => {
  return generatePluginCss({
    triangles: {
      'down': {
        direction: 'down',
        size: '24px',
        height: '8px',
        color: 'yellow',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-down {
        width: 0;
        height: 0;
        border-top: 8px solid yellow;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
      }
    `);
  });
});

test('there are 8 possible directions', () => {
  return generatePluginCss({
    triangles: {
      'left': {
        direction: 'left',
      },
      'right': {
        direction: 'right',
      },
      'up': {
        direction: 'up',
      },
      'down': {
        direction: 'down',
      },
      'left-up': {
        direction: 'left-up',
      },
      'left-down': {
        direction: 'left-down',
      },
      'right-up': {
        direction: 'right-up',
      },
      'right-down': {
        direction: 'right-down',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-left {
        width: 0;
        height: 0;
        border-right: .5em solid currentColor;
        border-top: .5em solid transparent;
        border-bottom: .5em solid transparent;
      }
      .c-triangle-right {
        width: 0;
        height: 0;
        border-left: .5em solid currentColor;
        border-top: .5em solid transparent;
        border-bottom: .5em solid transparent;
      }
      .c-triangle-up {
        width: 0;
        height: 0;
        border-bottom: .5em solid currentColor;
        border-left: .5em solid transparent;
        border-right: .5em solid transparent;
      }
      .c-triangle-down {
        width: 0;
        height: 0;
        border-top: .5em solid currentColor;
        border-left: .5em solid transparent;
        border-right: .5em solid transparent;
      }
      .c-triangle-left-up {
        width: 0;
        height: 0;
        border-top: .7071067811865475em solid currentColor;
        border-right: .7071067811865475em solid transparent;
      }
      .c-triangle-left-down {
        width: 0;
        height: 0;
        border-bottom: .7071067811865475em solid currentColor;
        border-right: .7071067811865475em solid transparent;
      }
      .c-triangle-right-up {
        width: 0;
        height: 0;
        border-top: .7071067811865475em solid currentColor;
        border-left: .7071067811865475em solid transparent;
      }
      .c-triangle-right-down {
        width: 0;
        height: 0;
        border-bottom: .7071067811865475em solid currentColor;
        border-left: .7071067811865475em solid transparent;
      }
    `);
  });
});

test('when the height of a triangle is not set, it defaults to half its size', () => {
  return generatePluginCss({
    triangles: {
      'default': {
        size: '24px',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-default {
        width: 0;
        height: 0;
        border-left: 12px solid currentColor;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
      }
    `);
  });
});

test('...unless we specified a default height', () => {
  return generatePluginCss({
    defaultOptions: {
      height: '4rem',
    },
    triangles: {
      'default': {
        size: '24px',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-default {
        width: 0;
        height: 0;
        border-left: 4rem solid currentColor;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
      }
    `);
  });
});

test('the height has no effect when the direction is diagonal', () => {
  return generatePluginCss({
    triangles: {
      'right-down': {
        direction: 'right-down',
        height: '99999px',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-right-down {
        width: 0;
        height: 0;
        border-bottom: .7071067811865475em solid currentColor;
        border-left: .7071067811865475em solid transparent;
      }
    `);
  });
});

test('you can set default triangle options and override them', () => {
  return generatePluginCss({
    defaultOptions: {
      direction: 'up',
      size: '2rem',
      color: 'red',
    },
    triangles: {
      'default': {},
      'special-left': {
        direction: 'left',
        size: '10vw',
        height: '5vw',
        color: 'blue',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-default {
        width: 0;
        height: 0;
        border-bottom: 1rem solid red;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
      }
      .c-triangle-special-left {
        width: 0;
        height: 0;
        border-right: 5vw solid blue;
        border-top: 5vw solid transparent;
        border-bottom: 5vw solid transparent;
      }
    `);
  });
});
