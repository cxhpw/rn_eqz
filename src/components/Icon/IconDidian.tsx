/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconDidian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.296875 116.66357422c-159.71748047 0-289.17861328 132.42568359-289.17861328 295.75019531 0 163.33242187 289.17861328 492.91875 289.17861328 492.91875s289.18564453-329.58632812 289.18564453-492.91875c0-163.32451172-129.49628906-295.75019531-289.18564453-295.75019531v0zM511.296875 535.64345703c-79.846875 0-144.58710937-66.20537109-144.58710937-147.87509766 0-81.66181641 64.74375-147.87509766 144.58710937-147.87509765 79.84160156 0 144.59501953 66.21416016 144.59501953 147.87509765-0.00087891 81.66972656-64.75341797 147.87509766-144.59501953 147.87509766v0zM511.296875 535.64345703z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDidian.defaultProps = {
  size: 18,
};

IconDidian = React.memo ? React.memo(IconDidian) : IconDidian;

export default IconDidian;
