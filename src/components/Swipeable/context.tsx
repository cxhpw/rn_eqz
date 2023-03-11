import { usePrevious } from 'ahooks';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const Context = createContext<{
  changeState: (id: string | number) => void;
  id?: string | number;
}>({
  changeState: () => {},
  id: undefined,
});

const Provider = ({ children }: PropsWithChildren<{}>) => {
  const [currentId, setCurrentId] = useState<string | number>('');
  const previousId = usePrevious(currentId);
  const changeState = (id: string | number) => {
    setCurrentId(id);
  };
  return (
    <Context.Provider
      value={{
        changeState: changeState,
        id: previousId,
      }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
