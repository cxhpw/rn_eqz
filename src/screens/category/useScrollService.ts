import { useSafeState } from 'ahooks';
import { useCallback, useEffect } from 'react';

let i = 0;
const MENUITEM_HEIGHT = 44;
export default function useScrollService(
  ref?: any,
  current: number = 0,
  initalValue: Goods[] = [],
) {
  const [active, setActive] = useSafeState(-1);
  const [_height, setHeight] = useSafeState(MENUITEM_HEIGHT);
  const [content, setContent] = useSafeState<Goods | null>(() => {
    if (!initalValue.length) {
      return null;
    }
    return initalValue[active];
  });
  const update = useCallback(
    (height: number) => {
      function scrollToCenter(max: number) {
        let offsetTop = 0;
        // eslint-disable-next-line @typescript-eslint/no-shadow
        for (let i = 0; i < max; i++) {
          offsetTop += MENUITEM_HEIGHT;
        }
        const y = offsetTop - (height - MENUITEM_HEIGHT) / 2;
        ref?.current?.scrollTo({
          y: y,
        });
      }
      // 在ScrollView组件 的onLayout 事件中会调用此函数并将获取到组件的高度保存到钩子中
      setHeight(height);
      return scrollToCenter(current);
    },
    [current, ref, setHeight],
  );
  useEffect(() => {
    console.log(++i, active, current);
    if (active !== current || initalValue[current] !== undefined) {
      setActive(current);
      setContent(initalValue[current]);
      update(_height);
    }
  }, [_height, active, current, initalValue, setActive, setContent, update]);

  return { active, content, update };
}
