import { useToast as useNAtiveToast, IToastProps } from 'native-base';

export default function useToast() {
  const { show, close, closeAll } = useNAtiveToast();

  const showToast: (opt: IToastProps | string) => void = opt => {
    closeAll();
    if (typeof opt === 'string') {
      opt = {
        description: opt,
      };
    }
    show({
      placement: 'top',
      duration: 2000,
      ...opt,
    });
  };

  return {
    showToast,
    hideToast: close,
  };
}
