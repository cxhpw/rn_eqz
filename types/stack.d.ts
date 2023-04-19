type CommonStackParamList = {
  Complaint: undefined;
  Help: undefined;
  Address: {
    pageIsRefresh?: boolean;
    from?: 'OrderSubmit';
    onChange?: (value: any) => void;
  };
  AddAddress: {
    id?: string | number;
  };
  WebView: {
    url: string;
  };
  Activity: {
    id?: string | number;
  };
  Company: undefined;
};

type AuthStackParamList = {};

type MainStackParamList = {
  Tab: undefined;
  Home: undefined;
  Category: { id?: number };
  Chat: undefined;
  My: undefined;
  Detail: {
    id?: number | string;
    /**
     * 保存租赁日期数组
     * @example ["2023-04-23", "2023-04-27"]
     */
    startEnd?: string[];
    /** 是否默认显示modal */
    isShowModal?: boolean;
  };
  Order: { code?: number | string };
  Calendar: {
    start?: string;
    end?: string;
    minDay?: number | string;
    fn?: (n: boolean) => void;
    leaseterm?: number[] | string[];
    id?: number | string;
    spec?: string;
  };
  Search: undefined;
  OrderDetail: { id: number };
  OrderSubmit: { id: number; start: string; end: string };
};

type AppParamList = MainStackParamList &
  AuthStackParamList &
  CommonStackParamList;
