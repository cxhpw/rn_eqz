/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconJinggao from './IconJinggao';
import IconWarning from './IconWarning';
import IconRight from './IconRight';
import IconJindu from './IconJindu';
import IconYirenzheng from './IconYirenzheng';
import IconYouhuijuan from './IconYouhuijuan';
import IconDidian from './IconDidian';
import IconKuaidi from './IconKuaidi';
import IconSousuoO from './IconSousuoO';
import IconSousuo from './IconSousuo';
import IconEyeclose from './IconEyeclose';
import IconEyeopen from './IconEyeopen';
export { default as IconJinggao } from './IconJinggao';
export { default as IconWarning } from './IconWarning';
export { default as IconRight } from './IconRight';
export { default as IconJindu } from './IconJindu';
export { default as IconYirenzheng } from './IconYirenzheng';
export { default as IconYouhuijuan } from './IconYouhuijuan';
export { default as IconDidian } from './IconDidian';
export { default as IconKuaidi } from './IconKuaidi';
export { default as IconSousuoO } from './IconSousuoO';
export { default as IconSousuo } from './IconSousuo';
export { default as IconEyeclose } from './IconEyeclose';
export { default as IconEyeopen } from './IconEyeopen';

export type IconNames =
  | 'jinggao'
  | 'warning'
  | 'right'
  | 'jindu'
  | 'yirenzheng'
  | 'youhuijuan'
  | 'didian'
  | 'kuaidi'
  | 'sousuo_o'
  | 'sousuo'
  | 'eyeclose'
  | 'eyeopen';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'jinggao':
      return <IconJinggao key="1" {...rest} />;
    case 'warning':
      return <IconWarning key="2" {...rest} />;
    case 'right':
      return <IconRight key="3" {...rest} />;
    case 'jindu':
      return <IconJindu key="4" {...rest} />;
    case 'yirenzheng':
      return <IconYirenzheng key="5" {...rest} />;
    case 'youhuijuan':
      return <IconYouhuijuan key="6" {...rest} />;
    case 'didian':
      return <IconDidian key="7" {...rest} />;
    case 'kuaidi':
      return <IconKuaidi key="8" {...rest} />;
    case 'sousuo_o':
      return <IconSousuoO key="9" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="10" {...rest} />;
    case 'eyeclose':
      return <IconEyeclose key="L1" {...rest} />;
    case 'eyeopen':
      return <IconEyeopen key="L2" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
