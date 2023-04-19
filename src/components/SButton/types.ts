import { MutableRefObject } from 'react';
import {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Colors } from '../Theme/theme';

export interface InterfaceButtonProps
  extends Partial<
    Pick<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'children'>
  > {
  /** 为true，则显示一个spinner */
  isLoading?: boolean;
  /** 为true，显示pressed状态 */
  isPressed?: boolean;
  /** loading状态显示文本  */
  isLoadingText?: string;
  /** 当isLoading设置为true时要显示的loading元素。 */
  spinner?: JSX.Element;
  /** 为true，显示disabled状态 */
  isDisabled?: boolean;
  /** spinner显示位置 */
  spinnerPlacement?: 'start' | 'end';
  /** 要在按钮中显示的左侧图标元素。 */
  leftIcon?: JSX.Element | Array<JSX.Element>;
  /** 要在按钮中显示的右侧图标元素。 */
  rightIcon?: JSX.Element | Array<JSX.Element>;
  /**
   * 按钮主题
   * @default Solid
   * */
  variant?: ButtonVariants;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle & TextStyle>;
  /** 字体颜色 */
  colorScheme?: Colors;
  /** loading颜色 */
  indicatorColor?: string;
}

export type ButtonVariants =
  | 'Solid'
  | 'Subtle'
  | 'Outline'
  | 'Link'
  | 'Ghost'
  | 'Unstyled';

export interface IButtonGroupProps {
  /**
   * 按钮组方向
   * @default row
   */
  direction?: 'column' | 'row';
  /**
   * 按钮是否连接在一起
   */
  isAttached?: boolean;
  /** */
  children: JSX.Element | Array<JSX.Element>;
}

export type IButtonComponentType = ((
  props: IButtonProps & { ref?: MutableRefObject<any> },
) => JSX.Element) & {
  Group: React.MemoExoticComponent<
    (props: IButtonGroupProps & { ref?: MutableRefObject<any> }) => JSX.Element
  >;
};

export type IButtonProps = InterfaceButtonProps;
