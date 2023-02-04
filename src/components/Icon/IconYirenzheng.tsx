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

let IconYirenzheng: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M238.5 519.7c0 112.8 144.9 311.6 273.5 311.6s273.5-198.8 273.5-311.6V283.8c-128.6 0-203.8-37.6-273.5-91-69.7 53.4-144.9 90.5-273.5 90.5v236.4z m168.2-58.4l70.7 68.7c28.2-24.7 57.4-48.5 80.1-66.3 12.9-10.4 25.2-19.8 37.6-28.7 11.9-8.9 24.7-18.3 39.1-28.2 23.7-16.8 54.4-38.6 86.5-59.3l22.3 30.2c-17.3 10.9-44.5 35.6-68.2 58.4-13.8 13.4-28.2 27.2-42.5 42.5-15.8 16.8-32.6 35.6-50.4 56.4-30.2 35.1-70.7 84.6-109.8 140.9l-148-146.3 82.6-68.3z"
        fill={getIconColor(color, 0, '#F29318')}
      />
      <Path
        d="M512 64.4C414.1 139.6 308.7 192 128.7 192v330.8c0 157.8 203.3 436.7 383.3 436.7 180.5 0 383.3-278.9 383.3-436.7V192C714.8 192 609.9 139.6 512 64.4z m328.9 457.5c0 135.5-174.1 374.4-328.9 374.4S183.1 657.4 183.1 521.9V238c154.8 0 244.8-45 328.9-109.3C595.6 193.5 686.1 238 840.9 238v283.9z"
        fill={getIconColor(color, 1, '#F6BF53')}
      />
    </Svg>
  );
};

IconYirenzheng.defaultProps = {
  size: 18,
};

IconYirenzheng = React.memo ? React.memo(IconYirenzheng) : IconYirenzheng;

export default IconYirenzheng;
