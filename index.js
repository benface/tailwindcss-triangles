const _ = require('lodash');
const valueParser = require('postcss-value-parser');

module.exports = function(options = {}) {
  return ({ config, e, addComponents }) => {
    const defaultOptions = {
      componentPrefix: 'c-',
      defaultSize: '1em',
      defaultColor: 'currentColor',
    };
    options = _.merge({}, defaultOptions, options);

    const triangles = config('theme.triangles', {});

    _.forEach(triangles, function(value, modifier) {
      const triangle = _.defaults({}, value, {
        size: options.defaultSize,
        color: options.defaultColor,
      });
      triangle.name = `triangle-${modifier}`;
      triangle.parsedSize = valueParser.unit(triangle.size);
      triangle.styles = {
        width: '0',
        height: '0',
      };

      if (_.includes(['left', 'right', 'up', 'down'], triangle.direction)) {
        if (triangle.height === undefined) {
          triangle.height = `${triangle.parsedSize.number / 2}${triangle.parsedSize.unit}`;
        }
        let solidBorderValue = `${triangle.height} solid ${triangle.color}`;
        let transparentBordersValue = `${triangle.parsedSize.number / 2}${triangle.parsedSize.unit} solid transparent`;
        switch (triangle.direction) {
          case 'left': triangle.styles.borderRight = solidBorderValue; break;
          case 'right': triangle.styles.borderLeft = solidBorderValue; break;
          case 'up': triangle.styles.borderBottom = solidBorderValue; break;
          case 'down': triangle.styles.borderTop = solidBorderValue; break;
        }
        if (triangle.direction === 'left' || triangle.direction === 'right') {
          triangle.styles.borderTop = transparentBordersValue;
          triangle.styles.borderBottom = transparentBordersValue;
        }
        if (triangle.direction === 'up' || triangle.direction === 'down') {
          triangle.styles.borderLeft = transparentBordersValue;
          triangle.styles.borderRight = transparentBordersValue;
        }
      }
      else {
        let borderWidth = `${triangle.parsedSize.number / Math.sqrt(2)}${triangle.parsedSize.unit}`;
        let solidBorderValue = `${borderWidth} solid ${triangle.color}`;
        let transparentBorderValue = `${borderWidth} solid transparent`;
        switch (triangle.direction) {
          case 'left-up':
          case 'up-left':
            triangle.styles.borderTop = solidBorderValue;
            triangle.styles.borderRight = transparentBorderValue;
            break;
          case 'left-down':
          case 'down-left':
            triangle.styles.borderBottom = solidBorderValue;
            triangle.styles.borderRight = transparentBorderValue;
            break;
          case 'right-up':
          case 'up-right':
            triangle.styles.borderTop = solidBorderValue;
            triangle.styles.borderLeft = transparentBorderValue;
            break;
          case 'right-down':
          case 'down-right':
            triangle.styles.borderBottom = solidBorderValue;
            triangle.styles.borderLeft = transparentBorderValue;
            break;
        }
      }

      addComponents({
        [`.${e(`${options.componentPrefix}${triangle.name}`)}`]: triangle.styles,
      });
    });
  };
};
