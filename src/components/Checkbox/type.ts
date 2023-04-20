import { MutableRefObject } from 'react';
import { CheckboxGroupState as _CheckboxGroupState } from '@react-stately/checkbox';
import { ViewProps } from 'react-native';
import { TouchableOpacity } from './usePropsResolution';
type TValue = string[];
type handleChangeFunction<T> = (e: T) => void;

export interface CheckboxProps
  extends TouchableOpacity,
    Pick<ViewProps, 'accessibilityLabel'> {
  // 复选框的值
  value: string;
  // 是否被默认选中
  checked?: boolean;
  // 和checked 区别在于组件是否受控，defaultChecked只会在初始化中使用
  defaultChecked?: boolean;
  // 元素不可用
  disabled?: boolean;
  // 中间状态
  indeterminate?: boolean;
  // 复选框事件
  onChange?: handleChangeFunction<boolean>;
  children?: JSX.Element | JSX.Element[] | string;
  /**
   *  shape fro input
   * @default square
   */
  shape?: 'square' | 'circular';
  size?: number;
}

export interface CheckboxGroupProps {
  /** 默认值 */
  defaultValue?: string[];
  onChange?: handleChangeFunction<string[]>;
}

export interface CheckboxGroupContext {
  size?: number;
  state: _CheckboxGroupState;
}

export type CheckboxComponentType = ((props: CheckboxProps) => JSX.Element) & {
  Group: React.MemoExoticComponent<
    (props: CheckboxGroupProps & { ref: MutableRefObject<any> }) => JSX.Element
  >;
};
