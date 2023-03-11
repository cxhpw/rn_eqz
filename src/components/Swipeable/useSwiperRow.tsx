import { useContext, useEffect, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

import type { Props as SwipeRowProps } from '.';
import { Context as SwipeRowContext } from './context';

export default function useSwipeRow({ id }: Pick<SwipeRowProps, 'id'>) {
  const swipeableRef = useRef<Swipeable>(null);
  const { changeState, id: previousOpenId } = useContext(SwipeRowContext);
  useEffect(() => {
    if (id === previousOpenId) {
      swipeableRef.current?.close();
    }
  }, [id, previousOpenId]);

  return {
    swipeableRef,
    changeState,
    // handleRemove: useMemoizedFn(handleRemove),
  };
}
