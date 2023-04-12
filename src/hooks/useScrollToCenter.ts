import { RefObject } from 'react';
import { ScrollView, View } from 'react-native';
import { useRequest } from 'ahooks';
import Animated from 'react-native-reanimated';

/**
 * scrollView 居中所需要的移动距离
 * @param direction 'horizontal' | 'vertical'
 * @param ref ref
 * @param idx number
 * @param wrapperRef ref
 * @returns number
 */
const useScrollToCenterDistance = ({
  direction = 'horizontal',
  ref,
  wrapperRef,
  idx,
}: {
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 需要居中的元素 */
  ref: RefObject<View>;
  /** 需要居中的元素下标 */
  idx: number;
  /** ScrollView */
  wrapperRef: RefObject<Animated.ScrollView | ScrollView>;
}): number => {
  const { data } = useRequest(
    async () => {
      const run = async () => {
        const a = new Promise(resolve => {
          ref.current?.measureLayout(
            wrapperRef.current as any,
            (left, top, width, height) => {
              resolve({
                left,
                top,
                width,
                height,
              });
            },
            () => {},
          );
        });
        const b = new Promise(resolve => {
          //@ts-ignore
          wrapperRef.current?.measureInWindow(
            (x: any, y: any, width: number, height: number) => {
              resolve({
                width,
                height,
              });
            },
          );
        });
        return Promise.all([a, b]);
      };
      return run();
    },
    {
      refreshDeps: [idx],
    },
  );
  let size = 0;
  let offset = 0;
  let totalSize = 0;
  if (data === undefined || ref === undefined || ref.current === null) {
    return 0;
  }
  const cell = data![0] as {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  const scrollView = data![1] as {
    width: number;
    height: number;
  };
  size = direction === 'horizontal' ? cell.width : cell.height;
  totalSize = direction === 'horizontal' ? scrollView.width : scrollView.height;
  offset = direction === 'horizontal' ? cell.left : cell.top;

  const x = offset - (totalSize - size) / 2;
  wrapperRef.current?.scrollTo({
    x,
  });
  return x;
};

export default useScrollToCenterDistance;
