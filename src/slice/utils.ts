import { StateCreator } from 'zustand';
import request from '@/request';

export type isOnlineSlice = {
  isOnline: boolean;
  setNetwork: (n: boolean) => void;
};
export const createisOnlineSlice: StateCreator<isOnlineSlice> = set => ({
  isOnline: false,
  setNetwork: state => set({ isOnline: state }),
});

type TFeedBack = {
  BusinessPhone: string;
  PlatformServices: string;
  ServiceTime: string;
};
export type CServiceSlice = {
  serviceInfo: TFeedBack;
  fetchService: () => Promise<TFeedBack>;
};

export const createCServiceSlice: StateCreator<CServiceSlice> = set => ({
  serviceInfo: {} as TFeedBack,
  fetchService: async () => {
    const res = await request({
      url: '/Include/ajax/AjaxMethod.aspx',
      params: {
        t: 'getserversummary',
      },
    });
    set({ serviceInfo: res.data });
    return res.data;
  },
});
