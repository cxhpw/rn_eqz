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
<svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M925.781333 379.733333l60.373334 60.330667a637.994667 637.994667 0 0 1-452.565334 187.477333 637.994667 637.994667 0 0 1-452.48-187.434666l60.330667-60.330667a552.96 552.96 0 0 0 392.149333 162.432c153.173333 0 291.84-62.08 392.192-162.474667z" fill="#444444" /><path d="M127.99307 366.325395l60.339779 60.339779-60.339779 60.339778L67.653291 426.665174z" fill="#444444" /><path d="M192.914258 501.311099l65.369126 54.851209-109.702419 130.738252L83.211839 632.049351z" fill="#444444" /><path d="M391.512277 565.33021l80.187103 29.185719-58.371438 160.374207L333.140839 725.704417z" fill="#444444" /><path d="M570.716052 592.382238l80.187104-29.185719 58.371438 160.374207L629.08749 752.756445z" fill="#444444" /><path d="M765.839382 556.179743l65.369126-54.85121 109.702419 130.738252L875.541801 686.917994z" fill="#444444" /><path d="M938.689036 366.337531l60.339779 60.339779-60.339779 60.339779L878.349258 426.67731z" fill="#444444" /></svg>
`;

let IconEyeclose: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconEyeclose.defaultProps = {
  size: 18,
};

IconEyeclose = React.memo ? React.memo(IconEyeclose) : IconEyeclose;

export default IconEyeclose;