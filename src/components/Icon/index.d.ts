/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

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

interface Props extends GProps, ViewProps {
  name:
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
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
