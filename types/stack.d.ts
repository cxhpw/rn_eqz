type CommonStackParamList = {};

type AuthStackParamList = {};

type MainStackParamList = {
  Tab: undefined;
  Home: undefined;
  Category: undefined;
  Chat: undefined;
  My: undefined;
  Detail: undefined;
};

type AppParamList = MainStackParamList &
  AuthStackParamList &
  CommonStackParamList;
