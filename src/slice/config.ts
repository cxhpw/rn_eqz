import { StateCreator } from 'zustand';
import request from '@/request';

type Ad = {
  addesc: string;
  adlist: { image: string; name: string; url: string }[];
  adname: string;
};
type Props = {
  PrTLImg: string;
  TagImg: string;
  WeiXinTopColor: string;
  WeiXinTopImg: string;
  alipayadimg: string;
  bytedancesharetitle: string;
  jdxbadimg: string;
  weixinadimg: string;
  ad1: Ad;
  ad2: Ad;
};

export type AppConfigSlice = {
  fetchAppConfig: () => Promise<Props>;
  appConfig: Props;
};
export const createAppConfigSlice: StateCreator<AppConfigSlice> = set => ({
  appConfig: {} as Props,
  fetchAppConfig: async () => {
    const res = await request.get('/Include/alipay/data.aspx', {
      params: {
        apiname: 'getweixinconfig',
      },
    });
    set({ appConfig: res.data });
    return res.data;
  },
});
