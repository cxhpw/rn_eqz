import { FC, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

import { SpacingProps } from '@shopify/restyle';

import helpers from '../helpers';
import UIActivityIndicator from '../Indicator/UIActivityIndicator';
import Text from '../Text';
import { Theme } from '../Theme/theme';
import useButton from './useButton';

const { scale } = helpers;
export type ButtonProps = SpacingProps<Theme> & {
  /** 按钮文字内容 */
  title: ReactNode;
  /** 按钮展示类型 */
  type?: 'primary' | 'secondary';
  /** 是否失效 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮点击事件 */
  onPress: () => void;
  /** 按钮的宽度 */
  width?: number | string;
  /** 圆角 */
  borderRadius?: number;
};

const Button: FC<ButtonProps> = props => {
  const { loading, title } = props;

  const { touchableProps, textColor, indicatorColor } = useButton(props);

  return (
    <TouchableOpacity {...touchableProps}>
      {loading && (
        <UIActivityIndicator
          color={indicatorColor}
          size={scale(18)}
          animating={loading}
          style={{ marginRight: scale(4) }}
        />
      )}
      {typeof title === 'string' ? (
        <Text variant="p0" color={textColor}>
          {title}
        </Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};
Button.displayName = 'Button';

export default Button;
