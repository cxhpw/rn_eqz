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
};

type AppParamList = MainStackParamList &
  AuthStackParamList &
  CommonStackParamList;
