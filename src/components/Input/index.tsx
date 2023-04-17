import { forwardRef, ReactNode } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../Box';
import Flex from '../Flex';
import helpers from '../helpers';
import SvgIcon from '../Icon';
import Text from '../Text';
import { Theme } from '../Theme/theme';
import InputItem from './InputItem';
import TextArea from './TextArea';
import useInput from './useInput';
import { ONE_PIXEL } from '../helpers/normalize';
import ErrorIcon from '../Toast/components/error';

const AnimatedTouchableIcon =
  Animated.createAnimatedComponent(TouchableOpacity);
const { scale } = helpers;
export interface InputProps
  extends Omit<
    TextInputProps,
    'placeholderTextColor' | 'onChange' | 'onChangeText'
  > {
  /** 标签 */
  label?: ReactNode;
  /** 标签位置。可选值：左侧/上方 */
  labelPosition?: 'left' | 'top';
  /** 输入类型。文本输入或者密码输入 */
  inputType?: 'input' | 'password';
  /** 输入框自定义样式 */
  inputStyle?: StyleProp<TextStyle>;
  /** 左侧图标 */
  leftIcon?: ReactNode;
  /** 右侧图标 */
  rightIcon?: ReactNode;
  /** 是否显示清除图标 */
  allowClear?: boolean;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示冒号 */
  colon?: boolean;
  /** 清除内容 */
  onClear?: () => void;
  /** 是否必填项 */
  required?: boolean;
  /** 其他内容 */
  brief?: ReactNode;
  /** 边框 */
  type?: 'bottom' | 'all';
  /** label样式 */
  labelStyle?: TextStyle;
  /** 输入框父元素样式 */
  containerStyle?: ViewStyle;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      labelPosition = 'left',
      leftIcon,
      rightIcon,
      inputType = 'input',
      inputStyle,
      disabled = false,
      allowClear = false,
      value,
      onChange,
      onClear,
      colon,
      required,
      style,
      brief,
      type = 'all',
      labelStyle,
      containerStyle,
      ...restProps
    },
    ref,
  ) => {
    const theme = useTheme<Theme>();
    const {
      LabelComp,
      inputValue,
      eyeOpen,
      clearIconStyle,
      handleChange,
      handleInputClear,
      triggerPasswordType,
    } = useInput({
      labelPosition,
      inputType,
      label,
      value,
      onChange,
      onClear,
      colon,
      required,
      labelStyle,
    });

    const InputContent = (
      <>
        {leftIcon && <Box marginHorizontal="x1">{leftIcon}</Box>}
        <Box flexGrow={1}>
          <TextInput
            ref={ref}
            {...restProps}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                height: scale(40),
                padding: 0,
                paddingHorizontal: theme.spacing.x1,
                fontSize: scale(14),
                color: theme.colors.text,
                includeFontPadding: false,
                textAlignVertical: 'center',
              },
              inputStyle,
            ]}
            editable={!disabled}
            textAlignVertical="center"
            placeholderTextColor={theme.colors.gray300}
            selectionColor={theme.colors.gray500}
            value={inputValue}
            onChangeText={handleChange}
            onSubmitEditing={e => handleChange(e.nativeEvent.text)}
            secureTextEntry={eyeOpen}
          />
        </Box>
        {allowClear && !disabled && (
          <AnimatedTouchableIcon
            activeOpacity={0.5}
            onPress={handleInputClear}
            style={[
              { width: 0, overflow: 'hidden', alignItems: 'center' },
              clearIconStyle,
            ]}>
            <ErrorIcon primary="#999" />
          </AnimatedTouchableIcon>
        )}
        {inputType === 'password' && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={triggerPasswordType}
            style={{ marginRight: theme.spacing.x1 }}>
            <SvgIcon
              name={eyeOpen ? 'eyeclose' : 'eyeopen'}
              color={[theme.colors.icon]}
              size={25}
            />
          </TouchableOpacity>
        )}
        {rightIcon && <Box marginRight="x1">{rightIcon}</Box>}
      </>
    );

    const InputWrapper =
      type === 'bottom' ? (
        <Flex
          borderBottomWidth={ONE_PIXEL}
          borderColor="border"
          borderRadius="x1"
          paddingRight="2.5"
          style={[style]}>
          {InputContent}
        </Flex>
      ) : (
        <Flex
          borderWidth={ONE_PIXEL}
          borderColor="border"
          borderRadius="x1"
          paddingRight="2.5"
          style={[style]}>
          {InputContent}
        </Flex>
      );

    const Brief = brief && (
      <Box marginTop="x1">
        {typeof brief === 'string' ? (
          <Text variant="p2" color="gray300">
            {brief}
          </Text>
        ) : (
          brief
        )}
      </Box>
    );

    return labelPosition === 'left' ? (
      <Flex alignItems="flex-start">
        {LabelComp}
        <Box style={[containerStyle]} flex={1}>
          {InputWrapper}
          {Brief}
        </Box>
      </Flex>
    ) : (
      <Box>
        {LabelComp}
        {InputWrapper}
        {Brief}
      </Box>
    );
  },
);
Input.displayName = 'Input';

export default Object.assign(Input, {
  InputItem,
  TextArea,
});
