import { useState, createContext, useContext, useRef, useMemo } from 'react';

export function createShareModel() {
  const Context = createContext<{
    value: OrderSettlement | null;
    onChange: (n: any) => void;
  } | null>(null);

  const Provider = ({
    children,
    value,
  }: {
    children: JSX.Element;
    value: OrderSettlement;
  }) => {
    const data = useRef<OrderSettlement>(value);
    const onChange = (n: OrderSettlement) => {
      data.current = n;
    };
    console.log(12312, data);
    return useMemo(
      () => (
        <Context.Provider
          value={{
            value: value,
            onChange,
          }}>
          {children}
        </Context.Provider>
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value],
    );
  };
  const useShareModel = () => {
    const value = useContext(Context);
    if (value === null) {
      throw new Error(`Component must be wrapped within Provider`);
    }
    return value;
  };
  return {
    Provider,
    useModel: useShareModel,
  };
}
