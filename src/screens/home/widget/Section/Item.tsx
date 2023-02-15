import { Text, Price } from '@/components';
import { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { navigate } from '@/services/NavigationService';

type Props = Product & {
  hasPrice?: boolean;
  renderIcon?: JSX.Element | '';
  IconStyle?: ViewStyle;
};

const Item: React.FC<Props> = ({
  ProImg,
  ProductName,
  AutoID,
  SpecialPrice,
  hasPrice,
  renderIcon,
  IconStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate('Detail', { id: AutoID });
      }}>
      <View style={style.wrapper}>
        <View style={{ position: 'relative' }}>
          <FastImage
            style={style.fastImage}
            source={{
              uri: ProImg,
            }}
          />
          <View style={[style.Icon, IconStyle]}>{renderIcon}</View>
        </View>
        <Text numberOfLines={2} mt="x1" variant="p2">
          {ProductName}
        </Text>
        {hasPrice && (
          <Price
            prefixStyle={{
              fontSize: 14,
            }}
            beforeStyle={{
              fontSize: 10,
            }}
            money={SpecialPrice}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  wrapper: {
    width: 185 / 2,
  },
  fastImage: {
    width: 185 / 2,
    height: 185 / 2,
    borderRadius: 4,
  },
  Icon: {
    position: 'absolute',
    top: 0,
    left: 6,
  },
});

export default memo(Item);
