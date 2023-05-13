interface Page<T> {
  dataList?: Array<T>;
  PageIndex?: number;
  PageSize?: number;
  TotalCount?: number;
  TotalPage?: number;
  NextPage?: number;
}

type UserInfo = {
  AutoID?: number;
  Amount?: number;
  HeaderPhoto?: string;
  Mobile?: string;
  NickName?: string;
  PingJiaNum?: number;
  bindphone?: boolean;
};

interface Token {
  accessToken?: string;
  refreshToken?: string;
  tokenExpireTime?: string;
  tokenExpiresIn?: number;
  userId?: number;
  ispassword?: boolean;
}

interface AjaxResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

type Obj = Record<string, any>;

type Product = {
  AutoID: string;
  Discount: string;
  Hit: number;
  IsSpecial: string;
  MinSellPrice: string;
  ProImg: string;
  ProductName: string;
  ProductTag: string[];
  ProductUrl: string;
  PromotionsTags: string[];
  SellPrice: string;
  SpecialPrice: string;
};

type OrderItem = {
  OrderID: number;
  OitemID: number;
  ContentImage: string;
  EndTime: string;
  OrderTotalAmount: number;
  OtherFee: number;
  ProName: string;
  Quantity: number;
  StartingTime: string;
  OrderStatus: number;
  ProImg: string;
};

const orderStatus = [
  {
    label: '全部',
    code: -1,
  },
  {
    label: '待付款',
    code: 1,
  },
  {
    label: '待发货',
    code: '10,18,11',
  },
  {
    label: '待收货',
    code: 1,
  },
  {
    label: '租用中',
    code: 12,
  },
  {
    label: '退还中',
    code: '13,15,16',
  },
  {
    label: '待退款',
    code: '14, 17',
  },
] as const;

type OrderStatus = typeof orderStatus;

type Goods = {
  AutoID: number;
  BannerUrl: string;
  CategoryBanner: string;
  CategoryImage: string;
  CategoryName: string;
  IsRecommend: boolean;
  ProductList: Product[];
  UrlRewriteName: string;
};

type ProductImage = {
  PicID: number;
  ImgSrc: string;
};

type ProductInfo = {
  AutoID: number;
  Hit: number;
  ProImg: string;
  Leaserule: string;
  MarketPrice: number;
  MarketPrice: number;
  MinSellPrice: number;
  ModelID: number;
  ProDetail: string;
  ProInsuranceRemark: string;
  ProductName: string;
  ProductTag: string[];
  PromotionsTags: {
    TageType: number;
    TageValue: string;
  }[];
  SellPrice: number;
  SellType: string;
  ShortDesc: string;
  SpecialPrice: string;
  Unit: string;
  serverRmark: string;
  serverTitle: string;
  Evaluation: number;
  IsSpecial: 'true' | 'false';
  SpecialSummary: { Daynum: number; Discount: number }[];
  MinDays: number;
};

type ProductDetail = {
  guige: {
    GuiGeName: string;
    GuiGeValue: string;
    IsImageShow: boolean;
  }[];
  partslist: [];
  piclist: ProductImage[];
  productdata: ProductInfo;
  prolist: Product[];
  leaseterm: string[];
};

type Spec = {
  name: string;
  checked: boolean;
  children: Spec[];
};

type ProductPrice = {
  autoid: number;
  code: number;
  dayprice: number;
  monthprice: number;
  msg: string;
  price: number;
  rentdays: number;
  rentprice: number;
  type: number;
  weekprice: number;
};

type AddressInfo = {
  Address: string;
  AutoID: number;
  AutoTimeStamp: string;
  City: string;
  Consignee: string;
  ContactPhone: string;
  Country: string;
  County: string;
  IsDefault: boolean;
  PostCode: stirng;
  Province: string;
  UserID: number;
  UserName: string;
};

type OrderSettlement = {
  address: string;
  deviceid: number;
  addrid: number;
  city: string;
  code: number;
  consignee: string;
  county: string;
  creditlineremark: string;
  delegationremark: string;
  endtime: string;
  fitting: string;
  deposit: number;
  orderprocessurl: string;
  phone: string;
  prid: number;
  primg: string;
  proinsuranceremark: string;
  province: string;
  regagreement: string;
  rent: number;
  startime: string;
  subdays: number;
  title: string;
  insurance: number;
};

type OrderDetail = {
  Address: string;
  AutoID: number;
  City: string;
  Consignee: string;
  Country: string;
  County: string;
  Days: number;
  EndTime: string;
  Expiretime: string;
  GoodsTotalAmout: number;
  Insurance: number;
  InsuranceFee: number;
  Integral: number;
  IsEva: boolean;
  IsInsurance: boolean;
  IsMyPay: boolean;
  IsOwn: boolean;
  IsReturnMyself: boolean;
  IsWxPay: boolean;
  Isintegral: boolean;
  LastModifyTime: string;
  NeedInvoice: boolean;
  OrderAddTime: string;
  OrderAuditTime: string;
  OrderClient: string;
  OrderFinishTime: string;
  OrderItem: OrderItem[];
  OrderNo: string;
  OrderPayTime: string;
  OrderShippingFee: number;
  OrderStatus: number;
  OrderTotalAmount: number;
  OrderType: number;
  OrdersSerialList: [];
  OtherFee: number;
  Phone: string;
  PostCode: string;
  Province: string;
  Remark: string;
  ReturnAddress: string;
  ReturnKuaiDiName: string;
  ReturnKuaiDiNo: string;
  StartingTime: string;
  UserID: number;
  UserName: string;
  integralLine: number;
  kuaidijson: null | any;
  paidOrderTotalAmount: nulber;
  paidOtherFee: number;
  unpaidOrderTotalAmount: number;
  unpaidOtherFee: number;
};
