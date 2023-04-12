import React, { PropsWithChildren, useContext, useRef } from 'react';
import { Field, FieldContext } from 'rc-field-form';
import type { FieldProps } from 'rc-field-form/es/Field';
import Text from '../Text';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../Theme/theme';
import { ViewStyle } from 'react-native';

const Enum = ['Input', 'Switch', 'Radio', 'Checkbox'];

type Props = PropsWithChildren<
  FieldProps & {
    /** 边框 */
    type?: 'bottom' | 'all';
  }
>;
interface ErrorProps {
  warning?: boolean;
  children?: React.ReactNode[];
}
const Error: React.FC<ErrorProps> = ({ children }) => (
  <Text variant="p3" color="func600">
    {children?.[0]}
  </Text>
);

let child: React.ReactElement;

const FormItem: React.FC<Props> = ({
  /** 边框 */
  type = 'all',
  name,
  children,
  ...fieldProps
}) => {
  const theme = useTheme<Theme>();
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
  //@ts-ignore
  if (!children || Enum.indexOf(children.type.render.displayName) === -1) {
    console.warn('Error: first children must be inculde a Form Component');
    return null;
  }
  return (
    <Field name={name} {...fieldProps} onMetaChange={onMetaChange}>
      {(control, meta, form) => {
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement((child = children as React.ReactElement), {
                ...control,
                ref,
                type,
                style:
                  meta.errors.length > 0
                    ? mergeStyleProps()
                    : child.props.style,
                brief: <Error>{meta.errors}</Error>,
              });
        return <>{childNode}</>;
      }}
    </Field>
  );
};
FormItem.displayName = 'FormItem';
export default FormItem;
