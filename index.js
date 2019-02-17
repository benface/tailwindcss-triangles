const _ = require('lodash');
const valueParser = require('postcss-value-parser');

module.exports = ({
  prefix = 'c-triangle-',
  defaultOptions = {},
  triangles = {},
} = {}) => ({ e, addComponents }) => {
  const defaultDefaultOptions = {
    direction: 'right',
    size: '1em',
    color: 'currentColor',
  };
  let mergedDefaultOptions = _.merge(defaultDefaultOptions, defaultOptions);
  _.forEach(triangles, function(triangle, triangleName) {
    let triangleDirection = triangle.direction !== undefined ? triangle.direction : mergedDefaultOptions.direction;
    let triangleSize = triangle.size !== undefined ? triangle.size : mergedDefaultOptions.size;
    let parsedTriangleSize = valueParser.unit(triangleSize);
    let triangleColor = triangle.color !== undefined ? triangle.color : mergedDefaultOptions.color;
    let triangleStyles = {
      width: '0',
      height: '0',
    };
    if (_.includes(['left', 'right', 'up', 'down'], triangleDirection)) {
      let triangleHeight = triangle.height !== undefined ? triangle.height : mergedDefaultOptions.height;
      if (triangleHeight === undefined) {
        triangleHeight = `${parsedTriangleSize.number / 2}${parsedTriangleSize.unit}`;
      }
      let solidBorderValue = `${triangleHeight} solid ${triangleColor}`;
      let transparentBordersValue = `${parsedTriangleSize.number / 2}${parsedTriangleSize.unit} solid transparent`;
      switch (triangleDirection) {
        case 'left': triangleStyles.borderRight = solidBorderValue; break;
        case 'right': triangleStyles.borderLeft = solidBorderValue; break;
        case 'up': triangleStyles.borderBottom = solidBorderValue; break;
        case 'down': triangleStyles.borderTop = solidBorderValue; break;
      }
      if (triangleDirection === 'left' || triangleDirection === 'right') {
        triangleStyles.borderTop = transparentBordersValue;
        triangleStyles.borderBottom = transparentBordersValue;
      }
      if (triangleDirection === 'up' || triangleDirection === 'down') {
        triangleStyles.borderLeft = transparentBordersValue;
        triangleStyles.borderRight = transparentBordersValue;
      }
    }
    else {
      let borderWidth = `${parsedTriangleSize.number / Math.sqrt(2)}${parsedTriangleSize.unit}`;
      let solidBorderValue = `${borderWidth} solid ${triangleColor}`;
      let transparentBorderValue = `${borderWidth} solid transparent`;
      switch (triangleDirection) {
        case 'left-up':
        case 'up-left':
          triangleStyles.borderTop = solidBorderValue;
          triangleStyles.borderRight = transparentBorderValue;
          break;
        case 'left-down':
        case 'down-left':
          triangleStyles.borderBottom = solidBorderValue;
          triangleStyles.borderRight = transparentBorderValue;
          break;
        case 'right-up':
        case 'up-right':
          triangleStyles.borderTop = solidBorderValue;
          triangleStyles.borderLeft = transparentBorderValue;
          break;
        case 'right-down':
        case 'down-right':
          triangleStyles.borderBottom = solidBorderValue;
          triangleStyles.borderLeft = transparentBorderValue;
          break;
      }
    }
    addComponents({
      [`.${e(`${prefix}${triangleName}`)}`]: triangleStyles,
    });
  });
};
