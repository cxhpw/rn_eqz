import { Text, Price, Pressable } from '@/components';
import { memo } from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import FastImage from 'react-native-fast-image';
import { push } from '@/services/NavigationService';

type Props = Product & {
  hasPrice?: boolean;
  renderIcon?: JSX.Element | '';
  IconStyle?: ViewStyle;
  size?: DimensionValue | undefined;
  px?: number;
  mx?: number;
  ItemStyle?: ViewStyle;
  onPress?: (id: any) => void;
};

const Item: React.FC<Props> = ({
  ProImg,
  ProductName,
  AutoID,
  SpecialPrice,
  hasPrice,
  renderIcon,
  IconStyle,
  size,
  px = 0,
  mx = 0,
  ItemStyle,
  onPress,
}) => {
  return (
    <View
      style={[
        {
          width: size,
          paddingHorizontal: px,
          marginHorizontal: mx,
        },
        ItemStyle,
      ]}>
      <Pressable
        scalable={false}
        onPress={() => {
          // navigate('Detail', { id: AutoID });
          typeof onPress === 'function'
            ? onPress(AutoID)
            : push('Detail', { id: AutoID });
        }}>
        <View style={style.wrapper}>
          <FastImage
            style={StyleSheet.absoluteFill}
            source={{
              uri: ProImg,
            }}
          />
          <View style={[style.Icon, IconStyle]}>{renderIcon}</View>
        </View>
        <Text numberOfLines={2} mt="x1" variant="p2" mb="x2">
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
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingBottom: '100%',
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  Icon: {
    position: 'absolute',
    top: 0,
    left: 6,
  },
});

export default memo(Item);
