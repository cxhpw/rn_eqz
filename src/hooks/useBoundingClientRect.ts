import { useLatest } from 'ahooks';
import { MutableRefObject } from 'react';

interface Refs<T> extends MutableRefObject<T> {}

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}
type SetRefs = (ref: any) => void;
type callbackFunction = (rect: RectProps[]) => void;

export default function useBoundingClientRect() {
  const refs = useLatest<any[]>([]);
  const setRefs: SetRefs = ref => {
    refs.current.push(ref);
  };
  return {
    setRefs,
    exec: (callback?: callbackFunction): Promise<RectProps[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          boundingClientRect(refs, resolve, callback);
        }, 100);
      });
    },
  };
}
function boundingClientRect(
  refs: Refs<unknown[]>,
  resolve: any,
  callback?: callbackFunction,
) {
  let result: RectProps[] = [];
  if (!Array.isArray(refs.current)) {
    refs.current = [refs.current];
  }
  refs.current.forEach((item: any, index: number) => {
    item.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        result.push({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
        if (index === refs.current.length - 1) {
          callback?.(result);
          resolve?.(result);
        }
      },
    );
  });
  return result;
}
