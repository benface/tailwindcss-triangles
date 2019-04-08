const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const trianglesPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        corePlugins: {
          container: false,
          ...(function() {
            let disabledCorePlugins = {};
            Object.keys(defaultConfig.variants).forEach(corePlugin => {
              disabledCorePlugins[corePlugin] = false;
            });
            return disabledCorePlugins;
          })(),
        },
        plugins: [
          trianglesPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind components;', {
    from: undefined,
  })
  .then(result => {
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

test('only a direction is required to generate a triangle component', () => {
  return generatePluginCss({
    theme: {
      triangles: {
        'right': {
          direction: 'right',
        },
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-right {
        width: 0;
        height: 0;
        border-left: .5em solid currentColor;
        border-top: .5em solid transparent;
        border-bottom: .5em solid transparent;
      }
    `);
  });
});

test('the component prefix is customizable', () => {
  return generatePluginCss({
    theme: {
      triangles: {
        'right': {
          direction: 'right',
        },
      },
    },
  }, {
    componentPrefix: '',
  }).then(css => {
    expect(css).toMatchCss(`
      .triangle-right {
        width: 0;
        height: 0;
        border-left: .5em solid currentColor;
        border-top: .5em solid transparent;
        border-bottom: .5em solid transparent;
      }
    `);
  });
});

test('directions, sizes, heights, and colors are customizable', () => {
  return generatePluginCss({
    theme: {
      triangles: {
        'down': {
          direction: 'down',
          size: '24px',
          height: '8px',
          color: 'yellow',
        },
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
    theme: {
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
    theme: {
      triangles: {
        'default': {
          direction: 'right',
          size: '24px',
        },
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

test('the default size and color are customizable and overridable', () => {
  return generatePluginCss({
    theme: {
      triangles: {
        'default': {
          direction: 'up',
          height: '2em',
        },
        'special-left': {
          direction: 'left',
          size: '10vw',
          height: '5vw',
          color: 'blue',
        },
      },
    },
  }, {
    defaultSize: '2em',
    defaultColor: 'red',
  }).then(css => {
    expect(css).toMatchCss(`
      .c-triangle-default {
        width: 0;
        height: 0;
        border-bottom: 2em solid red;
        border-left: 1em solid transparent;
        border-right: 1em solid transparent;
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
