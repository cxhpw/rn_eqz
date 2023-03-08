import { Box, Text } from '@/components';
import { StyleSheet } from 'react-native';
import Wrapper from './wrapper';

type Props = {
  item: any;
  [Key: string]: any;
};
const Card: React.FC<Props> = ({ item, ...rest }) => {
  const styles = StyleSheet.create({
    header: {},
  });
  return (
    <Box
      shadowOpacity={0.1}
      shadowOffset={{ width: 0, height: 0 }}
      borderRadius="x1"
      shadowColor="black"
      mb="x5"
      backgroundColor="white"
      padding="x5">
      <Text
        onPress={() => {
          rest?.onChange?.(rest?.index as number);
        }}
        mb="2.5"
        fontWeight="bold"
        style={styles.header}>
        {item.Title}
      </Text>
      {rest?.active && <Wrapper html={item.Content} />}
      <Text mt="2.5">{item.AutoTimeStamp}</Text>
    </Box>
  );
};

export default Card;
