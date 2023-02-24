type CommonStackParamList = {};

type AuthStackParamList = {};

type MainStackParamList = {
  Tab: undefined;
  Home: undefined;
  Category: { id?: number };
  Chat: undefined;
  My: undefined;
  Detail: { id: number | string };
  Order: { code: number | string };
  Help: undefined;
  Calendar: {
    start?: string;
    end?: string;
    fn: (n: boolean) => void;
  };
};

type AppParamList = MainStackParamList &
  AuthStackParamList &
  CommonStackParamList;
