type CommonStackParamList = {
  Complaint: undefined;
  OrderSubmit: undefined;
  Help: undefined;
  Address: undefined;
  AddAddress: {
    id?: string | number;
  };
};

type AuthStackParamList = {};

type MainStackParamList = {
  Tab: undefined;
  Home: undefined;
  Category: { id?: number };
  Chat: undefined;
  My: undefined;
  Detail: { id: number | string; startEnd?: string[] };
  Order: { code?: number | string };
  Calendar: {
    start?: string;
    end?: string;
    minDay?: number | string;
    fn: (n: boolean) => void;
    leaseterm?: number[] | string[];
    id: number | string;
    spec?: string;
  };
};

type AppParamList = MainStackParamList &
  AuthStackParamList &
  CommonStackParamList;
