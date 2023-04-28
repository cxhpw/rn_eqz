import { SButton, Portal } from '@/components';

type Props = {
  onPress: () => void;
  icon: JSX.Element;
};
const Fab: React.FC<Props> = ({ icon, onPress }) => {
  return (
    <SButton
      style={{
        position: 'absolute',
        height: 52,
        width: 52,
        bottom: 16,
        right: 16,
        zIndex: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
      }}
      onPress={onPress}
      leftIcon={icon}
    />
  );
};

export default Fab;
