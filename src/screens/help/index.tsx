import { Container, Tabs } from '@/components';
import { TabsScene } from '@/components/Tabs';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import TabView from './tabView';

type Props = {};

const Help: React.FC<Props> = () => {
  const { data = [], loading } = useCustomRequest(async () => {
    const res: [] = (
      await request.get('/Include/alipay/data.aspx', {
        params: {
          apiname: 'getarticlerecommend',
          nid: 2,
        },
      })
    ).data;
    return res.map((item: any) => {
      return {
        title: item.NodeName,
        key: item.NID,
        scene: () => TabView({ data: item.ContentList }),
      };
    });
  });
  return (
    <Container>
      <Tabs scenes={data as unknown as TabsScene[]} />
    </Container>
  );
};

export default Help;
