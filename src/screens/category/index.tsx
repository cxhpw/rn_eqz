import { Container, Fallback, Box, Flex } from '@/components';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import request from '@/request';
import { useCustomRequest } from '@/hooks';
import { Menu, RightContent } from './widget';
import type { IGestureResponderEvent } from './widget/menu/item';
import useScrollService from './useScrollService';
import useCheckNetworkError from '@/hooks/useCheckNetworkError';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
type Props = {
  name: string;
};
// 用来区分左侧激活状态到底是来自首页还是分类页面
let isMenuHandleEvent = false;
const Category: React.FC<
  PropsWithChildren<Props & BottomTabScreenProps<AppParamList, 'Category'>>
> = ({ route }) => {
  const { params } = route;
  useCheckNetworkError();
  const ref = useRef();
  const [active, setActive] = useState<number>(0);
  const { data: goods, loading } = useCustomRequest<Goods[]>(async () => {
    return (
      await request.get('/Include/alipay/data.aspx', {
        params: {
          apiname: 'getweappproductlist',
        },
      })
    ).data;
  });
  const { content, update } = useScrollService(ref, active, goods);
  const handleMenuChange = (e: IGestureResponderEvent) => {
    isMenuHandleEvent = true;
    setActive(e.dataset.index as number);
  };
  useEffect(() => {
    // 如果是左侧点击切换状态就直接返回
    if (isMenuHandleEvent) {
      isMenuHandleEvent = false;
      return;
    }
    // 首页点击栏目时，同步左侧菜单状态
    if ((content?.CategoryName ?? null) && params?.id && goods !== undefined) {
      for (let i = 0; i < goods.length; i++) {
        if (goods[i].AutoID === params.id) {
          setActive(i);
          return;
        }
      }
    }
  }, [content, goods, params]);
  return (
    <Container isBttomTabsScreen>
      {loading ? (
        <Fallback />
      ) : (
        <Flex flexDirection="row" flex={1}>
          <Box
            style={{
              width: '24%',
            }}>
            <Menu
              ref={ref}
              data={goods}
              activeIndex={active}
              onPress={handleMenuChange}
              // 页面渲染完成后执行
              onLayout={height => {
                update(height);
              }}
            />
          </Box>
          <Box flex={1}>
            <RightContent data={content} />
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default Category;
