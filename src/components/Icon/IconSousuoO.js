/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconSousuoO = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M490.666667 810.666667C315.733333 810.666667 170.666667 665.6 170.666667 490.666667S315.733333 170.666667 490.666667 170.666667 810.666667 315.733333 810.666667 490.666667 665.6 810.666667 490.666667 810.666667z m0-42.666667c153.6 0 277.333333-123.733333 277.333333-277.333333S644.266667 213.333333 490.666667 213.333333 213.333333 337.066667 213.333333 490.666667 337.066667 768 490.666667 768z m264.533333-42.666667l119.466667 119.466667-29.866667 29.866667-119.466667-119.466667 29.866667-29.866667z"
        fill={getIconColor(color, 0, '#444444')}
      />
    </Svg>
  );
};

IconSousuoO.defaultProps = {
  size: 18,
};

IconSousuoO = React.memo ? React.memo(IconSousuoO) : IconSousuoO;

export default IconSousuoO;
