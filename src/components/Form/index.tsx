import Form, { FormProps, useForm } from 'rc-field-form';
import FormItem from './FormItem';
import { PropsWithChildren } from 'react';

type Props = Omit<FormProps, 'component'>;
const Index: React.FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
  return (
    <Form component={false} {...props}>
      {children}
    </Form>
  );
};
Index.displayName = 'Form';

export default Object.assign(Index, { FormItem, useForm });
