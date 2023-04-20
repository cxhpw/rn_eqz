import CheckboxMain from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import type { CheckboxComponentType } from './type';

const CheckboxTemp: any = CheckboxMain;
// MemoExoticComponent<ForwardRefExoticComponent<RefAttributes<unknown>>>
// MemoExoticComponent<ForwardRefExoticComponent<(props: CheckboxProps & { ref: MutableRefObject<any>; }) => Element>>
CheckboxTemp.Group = CheckboxGroup;
const Checkbox = CheckboxTemp as CheckboxComponentType;

export type { CheckboxProps, CheckboxGroupProps } from './type';

export default Checkbox;
