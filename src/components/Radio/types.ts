import type { AccessibilityRole } from 'react-native';
import type { RadioGroupState } from '@react-stately/radio';
import type { MutableRefObject } from 'react';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { Theme } from '../Theme/theme';
export type IRadioValue = string;
export type IRadioGroupOnChangeHandler = (value: IRadioValue) => any;

export interface InterfaceRadioProps {
  /**
   * The value to be used in the radio input. This is the value that will be returned on form submission
   */
  value: IRadioValue;
  /**
   * 	If true, the radio will be disabled
   */
  isDisabled?: boolean;
  /**
   * 	If true, the radio will be hovered
   */
  isHovered?: boolean;
  /**
   * 	If true, the radio will be pressed
   */
  isPressed?: boolean;
  /**
   * 	If true, the radio will be focused
   */
  isFocused?: boolean;
  /**
   * 	If true, the radio focus ring will be visible
   */
  isFocusVisible?: boolean;
  /**
   * If true, the radio is marked as invalid. Changes style of unchecked state.
   */
  isInvalid?: boolean;
  /**
   * 	The size (width and height) of the radio.
   */
  size?: keyof Theme['spacing'];

  /**
   * If given, will use this icon instead of the default.
   */
  icon?: JSX.Element;
  /**
   * Ref to be passed to Icon's wrapper Box
   */
  wrapperRef?: any;

  ref?: MutableRefObject<any>;

  children?: JSX.Element | JSX.Element[] | string | any;
}
export interface IRadioGroupProps {
  /**
   * The value of the radio group.
   */
  value?: IRadioValue;
  /**
   * The name of the input field in a radio (Useful for form submission).
   */
  name: string;
  /**
   * The initial value of the radio group.
   */
  defaultValue?: IRadioValue;
  /**
   * 	The size (width and height) of the radio.
   */
  size?: number;
  /**
   *
   */
  // TODO: removing
  children?: JSX.Element | JSX.Element[] | string | any;
  /**
   * The callback fired when any children radio is checked or unchecked.
   */
  onChange?: IRadioGroupOnChangeHandler;
}
export interface IRadioContext {
  size?: number;
  state: RadioGroupState;
}

export type IUseRadioGroupReturnType = {
  radioGroupProps: {
    accessibilityRole: AccessibilityRole;
    onChange: (value: IRadioValue) => any;
    value: IRadioValue;
    name: string;
  };
};

export type IRadioComponentType = ((props: IRadioProps) => JSX.Element) & {
  Group: React.MemoExoticComponent<
    (props: IRadioGroupProps & { ref?: MutableRefObject<any> }) => JSX.Element
  >;
};

export type IRadioProps = InterfaceRadioProps & ViewProps;
