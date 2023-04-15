import { Box, Flex } from 'native-base';
import { memo } from 'react';
import { Pressable } from 'react-native';
import { Icon, Text } from '@/components';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';
import { navigate } from '@/services/NavigationService';

const SearchBar: React.FC = () => {
  const theme = useTheme<AppTheme>();
  return (
    <Box mx="2.5" my="2.5">
      <Pressable
        onPress={() => {
          navigate('Search');
        }}>
        <Flex
          px="15px"
          direction="row"
          alignItems="center"
          height="40px"
          overflow="hidden"
          borderRadius={4}
          backgroundColor="white">
          <Icon name="sousuo" color={theme.colors.primary500} size={25} />
          <Text color="primary500" fontSize={14} ml="x1">
            想体验什么？搜搜看
          </Text>
        </Flex>
      </Pressable>
    </Box>
  );
};

export default memo(SearchBar);
