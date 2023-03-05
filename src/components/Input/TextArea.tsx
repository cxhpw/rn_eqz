import { forwardRef, ReactNode } from 'react';
import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../Box';
import Flex from '../Flex';
import helpers from '../helpers';
import Text from '../Text';
import { Theme } from '../Theme/theme';
import useTextArea from './useTextArea';

const { ONE_PIXEL, scale } = helpers;
export interface TextAreaProps
  extends Omit<
    TextInputProps,
    'placeholderTextColor' | 'onChange' | 'onChangeText' | 'style'
  > {
  /** 标签 */
  label?: ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 文本域高度 */
  height?: number;
  /** 文本长度限制 */
  limit?: number;
  /** 是否有边框 */
  border?: boolean;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 额外内容 */
  brief?: ReactNode;
}

const TextArea = forwardRef<TextInput, TextAreaProps>(
  (
    {
      label,
      height = scale(150),
      limit,
      value = '',
      border = true,
      onChange,
      style,
      brief,
      required,
      ...restProps
    },
    ref,
  ) => {
    const theme = useTheme<Theme>();
    const { inputValue, handleChange, LabelComp } = useTextArea({
      value,
      onChange,
      required,
      label,
    });

    return (
      <Box>
        {LabelComp}
        <Box
          borderWidth={border ? ONE_PIXEL : 0}
          borderColor="border"
          style={style}>
          <TextInput
            ref={ref}
            {...restProps}
            style={[
              {
                height,
                padding: theme.spacing.x1,
                fontSize: scale(14),
                textAlignVertical: 'top',
                color: theme.colors.text,
              },
            ]}
            placeholderTextColor={theme.colors.gray300}
            value={inputValue}
            onChangeText={handleChange}
            multiline
            maxLength={limit}
          />
          {!!limit && (
            <Flex flexDirection="row-reverse" padding="x1">
              <Text variant="p1" color="gray300">
                {inputValue.length} / {limit}
              </Text>
            </Flex>
          )}
        </Box>
        {brief && (
          <Box marginTop="x1">
            {typeof brief === 'string' ? (
              <Text variant="p2" color="gray300">
                {brief}
              </Text>
            ) : (
              brief
            )}
          </Box>
        )}
      </Box>
    );
  },
);
TextArea.displayName = 'TextArea';

export default TextArea;
