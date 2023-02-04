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

let IconKuaidi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1029 1024" width={size} height={size} {...rest}>
      <Path
        d="M116.4921875 766.41812515L500.56889725 907.5078125V463.33708953L116.4921875 322.2474022v444.17072295z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M129.55630493 282.40307998l387.3427391 146.31471635 145.16527177-55.02502442-375.33691406-158.60790253-157.17109681 67.3182106z m773.37922097 0L516.89749909 116.4921875 383.55729294 173.6075325 766.6923542 334.04465866l136.2431717-51.64157868z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M383.55652047 173.6075325l-96.82989121 41.47733688 375.33768654 158.60790252 104.6280384-39.64811324L383.55652047 173.6075325z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M776.64725494 371.99486923v141.63814544l-97.93993949 44.4173813V407.98530769l-150.70392609 55.35178184V907.5078125l384.07670974-141.08968735V322.2474022l-135.43284416 49.74746703z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M776.64725494 513.63301468V371.99486923L678.70808792 407.98530769v150.06508828l97.9399395-44.4173813z"
        fill={getIconColor(color, 4, '#333333')}
      />
    </Svg>
  );
};

IconKuaidi.defaultProps = {
  size: 18,
};

IconKuaidi = React.memo ? React.memo(IconKuaidi) : IconKuaidi;

export default IconKuaidi;
