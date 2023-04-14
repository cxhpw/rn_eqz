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

let IconYanjingXianshi: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 277.333333c242.432 0 384 195.541333 384 234.666667 0 39.125333-141.568 234.666667-384 234.666667S128 551.125333 128 512C128 472.874667 269.568 277.333333 512 277.333333zM512 341.333333a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z"
        fill={getIconColor(color, 0, '#444444')}
      />
      <Path
        d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z"
        fill={getIconColor(color, 1, '#444444')}
      />
    </Svg>
  );
};

IconYanjingXianshi.defaultProps = {
  size: 18,
};

IconYanjingXianshi = React.memo
  ? React.memo(IconYanjingXianshi)
  : IconYanjingXianshi;

export default IconYanjingXianshi;
