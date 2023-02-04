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

let IconJinggao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.994 64C264.592 64 64 264.574 64 511.994 64 759.426 264.592 960 511.994 960 759.42 960 960 759.426 960 511.994 960 264.56 759.42 64 512.006 64h-0.012zM511 895.987c-212.07 0-384-171.942-384-384C127 299.903 298.93 128 510.987 128 723.071 128 895 299.916 895 512c0 212.07-171.93 384-384.013 384l0.013-0.013zM511.323 228c-25.166 0-45.568 20.402-45.568 45.568 0 0.574 0.01 1.148 0.033 1.722l11.332 299.804c0.695 18.39 15.806 32.942 34.21 32.942 18.405 0 33.516-14.551 34.21-32.942l11.321-299.804c0.95-25.15-18.668-46.308-43.818-47.258a45.57 45.57 0 0 0-1.72-0.032z m-0.734 440.016c-35.426 0-63.589 28.252-63.589 63.583 0 34.56 26.537 64.401 63.59 64.401 35.392 0 64.41-28.268 64.41-64.401C575 696.284 545.982 668 510.59 668v0.016z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconJinggao.defaultProps = {
  size: 18,
};

IconJinggao = React.memo ? React.memo(IconJinggao) : IconJinggao;

export default IconJinggao;
