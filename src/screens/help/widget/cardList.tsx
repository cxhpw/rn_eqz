import { View } from 'react-native';
import React, { Children, PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren<{}>;
const CardList: React.FC<Props> = ({ children }) => {
  const [active, setActive] = useState(-1);
  return (
    <View>
      {Children.map(children, (child, idx) => {
        return React.cloneElement(child as React.ReactElement, {
          index: idx,
          active: idx === active,
          onChange: setActive,
        });
      })}
    </View>
  );
};

export default CardList;
