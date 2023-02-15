import { Center, VStack, IStackProps } from 'native-base';
import { FC } from 'react';
import Image from 'react-native-fast-image';
import { Text, Pressable } from '@/components';
import { GestureResponderEvent } from 'react-native';

interface IGestureResponderEvent extends GestureResponderEvent {
  dataset: {
    [K: string]: any;
  };
}
type TMenuItem = { [T: string]: any; label: string; url: string };
type Props = {
  label: string;
  url: string | number;
  data?: TMenuItem;
  size?: number;
  cols?: number;
  onPress?: (event: IGestureResponderEvent) => any;
} & IStackProps;
const MenuItem: FC<Props> = ({
  label,
  url,
  size = 25,
  cols,
  onPress,
  data,
  ...rest
}) => {
  let createImage: () => JSX.Element;
  if (typeof url === 'number') {
    createImage = () => (
      <Image
        style={{
          width: size,
          height: size,
        }}
        source={url}
      />
    );
  } else {
    createImage = () => (
      <Image
        style={{
          width: size,
          height: size,
        }}
        source={{
          uri: url,
        }}
      />
    );
  }
  return (
    <VStack width={`1/${cols}`} {...rest}>
      <Pressable
        onPress={e => {
          //@ts-ignore
          const event = e as IGestureResponderEvent;
          event.dataset = { ...data };
          event.dataset.cols && delete event.dataset.cols;
          event.dataset.url && delete event.dataset.url;
          onPress?.(event as IGestureResponderEvent);
        }}>
        <Center>
          {createImage()}
          <Text variant="p2" mt="x2" color="black">
            {label}
          </Text>
        </Center>
      </Pressable>
    </VStack>
  );
};

export default MenuItem;
