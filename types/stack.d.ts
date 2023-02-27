type CommonStackParamList = {};

type AuthStackParamList = {};

type MainStackParamList = {
  Tab: undefined;
  Home: undefined;
  Category: { id?: number };
  Chat: undefined;
  My: undefined;
  Detail: { id: number | string; startEnd?: string[] };
  Order: { code: number | string };
  Help: undefined;
  Calendar: {
    start?: string;
    end?: string;
    minDay?: number | string;
    fn: (n: boolean) => void;
    leaseterm?: number[] | string[];
  };
};

type AppParamList = MainStackParamList &
  AuthStackParamList &
  CommonStackParamList;
