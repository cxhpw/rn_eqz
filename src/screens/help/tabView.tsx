import { ScrollView } from 'react-native';
import React from 'react';
import Card from './widget/card';
import CardList from './widget/cardList';

type Props = {
  data: any[];
  route: any;
};
const Demo: React.FC<Props> = ({ data = [], route }) => {
  if (route?.props) {
    data = route?.props;
  }
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 20,
      }}>
      <CardList>
        {data.map(item => (
          <Card key={item.AutoID} item={item} />
        ))}
      </CardList>
    </ScrollView>
  );
};

export default Demo;
