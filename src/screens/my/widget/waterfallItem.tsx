import FastImage from 'react-native-fast-image';
import { Price, Pressable, Box, Text } from '@/components';
import { StyleSheet, ViewStyle } from 'react-native';
import { navigate } from '@/services/NavigationService';
type Props = {
  data: Product;
  style?: ViewStyle;
};
const WaterfallItem: React.FC<Props> = ({ data, style }) => {
  return (
    <Box
      width="50%"
      marginBottom="2.5"
      style={[{ paddingHorizontal: 5 }, style]}>
      <Pressable
        scalable={false}
        onPress={() => {
          navigate('Detail', { id: data.AutoID });
        }}>
        <Box backgroundColor="white" borderRadius="x1" overflow="hidden">
          <Box style={styles.box}>
            <FastImage
              source={{
                uri: data?.ProImg,
              }}
              style={StyleSheet.absoluteFill}
            />
          </Box>
          <Box padding="x4">
            <Text color="gray500" mb="x1" variant="p2" numberOfLines={2}>
              {data?.ProductName}
            </Text>
            <Price
              prefixStyle={{
                fontSize: 14,
              }}
              money={data.SpecialPrice}
            />
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};
const styles = StyleSheet.create({
  box: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
  },
});

export default WaterfallItem;
