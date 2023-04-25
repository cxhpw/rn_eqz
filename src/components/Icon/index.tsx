/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconPhone from './IconPhone';
import IconBianji from './IconBianji';
import IconAdd from './IconAdd';
import IconEyeopen from './IconEyeopen';
import IconEyeclose from './IconEyeclose';
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
export { default as IconPhone } from './IconPhone';
export { default as IconBianji } from './IconBianji';
export { default as IconAdd } from './IconAdd';
export { default as IconEyeopen } from './IconEyeopen';
export { default as IconEyeclose } from './IconEyeclose';
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

export type IconNames =
  | 'phone'
  | 'bianji'
  | 'add'
  | 'eyeopen'
  | 'eyeclose'
  | 'jinggao'
  | 'warning'
  | 'right'
  | 'jindu'
  | 'yirenzheng'
  | 'youhuijuan'
  | 'didian'
  | 'kuaidi'
  | 'sousuo_o'
  | 'sousuo';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'phone':
      return <IconPhone key="1" {...rest} />;
    case 'bianji':
      return <IconBianji key="2" {...rest} />;
    case 'add':
      return <IconAdd key="3" {...rest} />;
    case 'eyeopen':
      return <IconEyeopen key="4" {...rest} />;
    case 'eyeclose':
      return <IconEyeclose key="5" {...rest} />;
    case 'jinggao':
      return <IconJinggao key="6" {...rest} />;
    case 'warning':
      return <IconWarning key="7" {...rest} />;
    case 'right':
      return <IconRight key="8" {...rest} />;
    case 'jindu':
      return <IconJindu key="9" {...rest} />;
    case 'yirenzheng':
      return <IconYirenzheng key="10" {...rest} />;
    case 'youhuijuan':
      return <IconYouhuijuan key="11" {...rest} />;
    case 'didian':
      return <IconDidian key="12" {...rest} />;
    case 'kuaidi':
      return <IconKuaidi key="13" {...rest} />;
    case 'sousuo_o':
      return <IconSousuoO key="14" {...rest} />;
    case 'sousuo':
      return <IconSousuo key="15" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
