import { createContext } from 'react';

const ProductContext = createContext<
  Partial<ProductDetail> &
    Partial<ProductPrice> & { spec: Spec[] } & {
      onChange: (index: number, obj: Spec) => void;
    }
>({} as any);

export default ProductContext;
