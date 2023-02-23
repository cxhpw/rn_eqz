interface Page<T> {
  list?: Array<T>;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPage?: number;
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
  leaseterm: string[];
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
