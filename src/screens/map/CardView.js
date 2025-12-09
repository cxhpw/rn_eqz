import { requireNativeComponent } from 'react-native';

const RCTCardView = requireNativeComponent('CardView');

export default function CardView(props) {
  return <RCTCardView {...props} />;
}
