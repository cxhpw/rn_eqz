import { create, StateCreator } from 'zustand';
import {
  createCServiceSlice,
  createisOnlineSlice,
  CServiceSlice,
  isOnlineSlice,
} from '@/slice/utils';
import { createAppConfigSlice, AppConfigSlice } from '@/slice/config';
import { createErrorSlice, ErrorSlice } from '@/slice/error';

type Slices = isOnlineSlice & CServiceSlice & AppConfigSlice & ErrorSlice;
type Create = StateCreator<Slices>;

const log = (_create: Create): StateCreator<Slices> => {
  return (set, get, api) => {
    return _create(
      args => {
        const str = Object.keys(args)[0] as keyof Slices & string;
        console.group(`状态${str}状态发生了改变\n`);
        console.log('prev state', str in get() ? get()[str] : null);
        set(args);
        console.log('new state', get()[str]);
        console.groupEnd();
      },
      get,
      api,
    );
  };
};

export const useStore = create<Slices>(
  log((...args) => ({
    ...createCServiceSlice(...args),
    ...createisOnlineSlice(...args),
    ...createAppConfigSlice(...args),
    ...createErrorSlice(...args),
  })),
);
