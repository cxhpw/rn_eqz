import { Box, Text as RNText, Pressable, Icon } from '@/components';
import { navigate } from '@/services/NavigationService';

export type Address = {
  name: string;
  address: string;
  phone: string;
  province: string;
  city: string;
  county: string;
};
type Props = {
  value: Address;
  onChange?: () => void;
};

const Text = ({ children, ...restProps }: any) => {
  return (
    <RNText color="white" {...restProps}>
      {children}
    </RNText>
  );
};
const AddressControl: React.FC<Props> = ({ value }) => {
  return (
    <Pressable
      scalable={false}
      activeOpacity={1}
      onPress={() => {
        navigate('Address', {
          from: 'OrderSubmit',
        });
      }}>
      <Box backgroundColor="black" padding="x4">
        <Text fontWeight="bold" mb="x1">
          收货人信息
        </Text>
        {value === null ? (
          <>
            <Text>请选择收货地址</Text>
          </>
        ) : (
          <>
            <Text fontWeight="bold">{value.name}</Text>
            <Text>
              {value.province}
              {value.city}
              {value.county}
              {value.address}
            </Text>
          </>
        )}
      </Box>
      <Box
        position="absolute"
        right={10}
        top="50%"
        style={{
          marginTop: -10,
        }}>
        <Icon name="right" color="#ffffff" size={20} />
      </Box>
    </Pressable>
  );
};

export default AddressControl;
