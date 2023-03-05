/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const xml = `
<svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 277.333333c242.432 0 384 195.541333 384 234.666667 0 39.125333-141.568 234.666667-384 234.666667S128 551.125333 128 512C128 472.874667 269.568 277.333333 512 277.333333zM512 341.333333a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z" fill="#444444" /><path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#444444" /></svg>
`;

let IconEyeopen: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconEyeopen.defaultProps = {
  size: 18,
};

IconEyeopen = React.memo ? React.memo(IconEyeopen) : IconEyeopen;

export default IconEyeopen;
