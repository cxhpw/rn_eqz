import { StyleSheet, Text, View, TextStyle, ColorValue } from 'react-native';

type Props = {
  money: number | string;
  prefixStyle?: TextStyle;
  suffixStyle?: TextStyle;
  color?: ColorValue;
  afterText?: string;
  beforeText?: string;
  beforeStyle?: TextStyle;
  style?: TextStyle;
};

function priceSlice(n: Props['money'], mode: string = 'prefix') {
  n = String(n);
  const i = n.trim().indexOf('.');
  return mode === 'prefix' ? n.slice(0, i) : n.slice(i);
}

const Price: React.FC<Props> = ({
  money,
  prefixStyle,
  suffixStyle,
  color = '#e4393c',
  beforeText = '￥',
  afterText = '/日起',
  style: commonStyle,
  beforeStyle,
}) => {
  return (
    <View style={[style.wrapper]}>
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
    marginTop: 5,
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
