import { Box, Flex } from 'native-base';
import { memo } from 'react';
import { Icon, Text } from '@/components';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

const SearchBar: React.FC = () => {
  const theme = useTheme<AppTheme>();
  return (
    <Box mx="2.5" my="2.5">
      <Flex
        px="15px"
        direction="row"
        alignItems="center"
        height="40px"
        overflow="hidden"
        borderRadius={4}
        backgroundColor="white">
        <Icon name="sousuo" color={theme.colors.placeholder} size={25} />
        <Text color="placeholder" fontSize={14} ml="x1">
          想体验什么？搜搜看
        </Text>
      </Flex>
    </Box>
  );
};

export default memo(SearchBar);
