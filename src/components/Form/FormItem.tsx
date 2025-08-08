// @ts-nocheck
import React, { useContext, useRef } from 'react';
import { Field, FieldContext } from 'rc-field-form';
import type { FieldProps } from 'rc-field-form/es/Field';
import Text from '../Text';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../Theme/theme';
import { ViewStyle } from 'react-native';

type Props = FieldProps & {
  /** 边框 */
  type?: 'bottom' | 'all';
};
interface ErrorProps {
  warning?: boolean;
  children?: string[];
}
export const ErrorMessage: React.FC<ErrorProps> = ({ children }) => (
  <Text variant="p3" color="func600">
    {children?.[0]}
  </Text>
);

const FormItem: React.FC<Props> = ({
  /** 边框 */
  type = 'all',
  name,
  children,
  ...fieldProps
}) => {
  const theme = useTheme<Theme>();
  /** 保存表单元素实例 */
  const ref = useRef<{ focus: () => void } | null>(null);
  const fieldContext = useContext(FieldContext);
  const mergeStyleProps = () => {
    if (type === 'bottom') {
      return {
        borderBottomColor: theme.colors.func600,
        borderBottomWidth: 1,
      } as ViewStyle;
    }
    if (type === 'all') {
      return {
        borderColor: theme.colors.func600,
        borderWidth: 1,
      } as ViewStyle;
    }
  };
  const onMetaChange = () => {
    const fieldErrors = fieldContext
      .getFieldsError()
      .filter(item => item.errors.length > 0);
    if (fieldErrors.length > 0 && name === fieldErrors[0]?.name?.[0]) {
      ref.current?.focus();
    }
  };
  return (
    <Field name={name} {...fieldProps} onMetaChange={onMetaChange}>
      {(control, meta, form) => {
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children, {
                ...control,
                ref,
                type,
                style:
                  meta.errors.length > 0
                    ? mergeStyleProps()
                    : children.props.style,
                brief: <ErrorMessage>{meta.errors}</ErrorMessage>,
              });
        return <>{childNode}</>;
      }}
    </Field>
  );
};
FormItem.displayName = 'FormItem';
export default FormItem;
