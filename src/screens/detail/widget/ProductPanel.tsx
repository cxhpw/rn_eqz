import { Text } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { Box, Flex } from 'native-base';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  data: ProductInfo | undefined;
};

const Tag = memo(({ title }: { title: string }) => {
  return <Text style={style.tag}>{title}</Text>;
});

const ProductPanel: React.FC<Props> = ({ data }) => {
  const theme = useTheme<AppTheme>();
  console.log('ProductPanel render');
  return (
    <Box
      padding={2.5}
      pb="15px"
      style={[style.wrapper, { borderBottomColor: theme.colors.border }]}>
      <Text variant="h2" mb="x5">
        {data?.ProductName}
      </Text>
      <Flex flexWrap="wrap" flexDirection="row">
        {data?.ProductTag?.map(item => (
          <Tag key={item} title={item} />
        ))}
      </Flex>
      <Text color="gray300" variant="p2" marginTop="2.5">
        {data?.ShortDesc}
      </Text>
    </Box>
  );
};

const style = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
  },
  tag: {
    color: '#FEFEFE',
    backgroundColor: '#EF775E',
    fontSize: 10,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
});

export default memo(ProductPanel);
