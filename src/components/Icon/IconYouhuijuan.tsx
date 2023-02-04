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

let IconYouhuijuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M839.35 516.36c0-55.77 39.95-102.21 92.8-112.25 12.34-2.35 21.46-12.74 21.46-25.3v-33.08c0-78.77-64.44-143.21-143.21-143.21H212.26c-78.77 0-143.21 64.44-143.21 143.21v23.98c0 12.55 9.11 22.94 21.44 25.3 52.8 10.08 92.7 56.48 92.7 112.22s-39.9 102.14-92.7 112.22c-12.33 2.35-21.44 12.74-21.44 25.3v55.68c0 78.77 64.44 143.21 143.21 143.21H810.4c78.77 0 143.21-64.44 143.21-143.21v-46.5c0-12.56-9.12-22.95-21.46-25.3-52.84-10.07-92.8-56.5-92.8-112.27z"
        fill={getIconColor(color, 0, '#F7B52C')}
      />
      <Path
        d="M342.25 495.81c-19.77 0-35.8-16.03-35.8-35.8V352.26c0-19.77 16.03-35.8 35.8-35.8s35.8 16.03 35.8 35.8V460c0.01 19.78-16.02 35.81-35.8 35.81zM342.25 729.68c-19.77 0-35.8-16.03-35.8-35.8V590.19c0-19.77 16.03-35.8 35.8-35.8s35.8 16.03 35.8 35.8v103.69c0.01 19.77-16.02 35.8-35.8 35.8z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconYouhuijuan.defaultProps = {
  size: 18,
};

IconYouhuijuan = React.memo ? React.memo(IconYouhuijuan) : IconYouhuijuan;

export default IconYouhuijuan;
