import { ViewStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type Renderable = JSX.Element | string | null;

export interface IconTheme {
  primary: string;
  secondary: string;
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
  | TValue
  | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg,
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);

export interface Toast {
  type: ToastType;
  /** 唯一标识 */
  id: string;
  message: ValueOrFunction<Renderable, Toast>;
  icon?: Renderable;
  /** toast持续时间 */
  duration?: number;
  pauseDuration: number;
  /** toast弹出方向 */
  position?: ToastPosition;

  style?: ViewStyle;
  iconTheme?: IconTheme;

  createdAt: number;
  /** toast状态 */
  visible: boolean;
  height?: number;
}

export type ToastOptions = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'style' | 'position' | 'iconTheme'>
>;

export type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions;
};

export interface ToasterProps {
  position?: ToastPosition;
  toastOptions?: DefaultToastOptions;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: ViewStyle;
  children?: (toast: Toast) => JSX.Element;
}

export interface ToastWrapperProps {
  id: string;
  style?: ViewStyle;
  onHeightUpdate: (id: string, height: number) => void;
  children?: React.ReactNode;
}