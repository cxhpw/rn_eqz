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

let IconPhone: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M682.666667 768 298.666667 768 298.666667 170.666667 682.666667 170.666667M490.666667 938.666667C455.253333 938.666667 426.666667 910.08 426.666667 874.666667 426.666667 839.253333 455.253333 810.666667 490.666667 810.666667 526.08 810.666667 554.666667 839.253333 554.666667 874.666667 554.666667 910.08 526.08 938.666667 490.666667 938.666667M661.333333 42.666667 320 42.666667C261.12 42.666667 213.333333 90.453333 213.333333 149.333333L213.333333 874.666667C213.333333 933.546667 261.12 981.333333 320 981.333333L661.333333 981.333333C720.213333 981.333333 768 933.546667 768 874.666667L768 149.333333C768 90.453333 720.213333 42.666667 661.333333 42.666667Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPhone.defaultProps = {
  size: 18,
};

IconPhone = React.memo ? React.memo(IconPhone) : IconPhone;

export default IconPhone;
