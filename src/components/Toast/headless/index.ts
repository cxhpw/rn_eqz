import { toast } from '../core/toast';

export type {
  DefaultToastOptions,
  IconTheme,
  Renderable,
  Toast,
  ToasterProps,
  ToastOptions,
  ToastPosition,
  ToastType,
  ValueFunction,
  ValueOrFunction,
} from '../core/types';

export { resolveValue } from '../core/types';
export { useToast } from '../core/useToast';
export { useStore as useToasterStore } from '../core/store';

export { toast };
export default toast;
