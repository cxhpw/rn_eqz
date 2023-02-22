import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ColorValue,
  ViewStyle,
} from 'react-native';

type Props = {
  money: number | string | undefined;
  prefixStyle?: TextStyle;
  suffixStyle?: TextStyle;
  color?: ColorValue;
  afterText?: string;
  beforeText?: string;
  beforeStyle?: TextStyle;
  style?: TextStyle;
  containerStyle?: ViewStyle;
};

function priceSlice(n: Props['money'], mode: string = 'prefix') {
  n = Number(n).toFixed(2);
  const i = n.trim().indexOf('.');
  return mode === 'prefix' ? n.slice(0, i) : n.slice(i);
}

const Price: React.FC<Props> = ({
  money = 0,
  prefixStyle,
  suffixStyle,
  color = '#e4393c',
  beforeText = '￥',
  afterText = '/日起',
  style: commonStyle,
  beforeStyle,
  containerStyle,
}) => {
  return (
    <View style={[style.wrapper, containerStyle]}>
      <Text style={[style.common, { color: color }, commonStyle]}>
        <Text style={[beforeStyle]}>{beforeText}</Text>
        <Text style={[style.prefix, prefixStyle]}>{priceSlice(money)}</Text>
        <Text style={[suffixStyle]}>{priceSlice(money, 'suffix')}</Text>
        <Text style={[style.after]}>{afterText}</Text>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 0,
  },
  common: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  prefix: {
    // fontSize: 14,
  },
  before: {
    // fontSize: 10,
  },
  after: {},
});

export default Price;
