import { memo } from 'react';
import { Pressable } from 'react-native';
import { Icon, Text, Box, Flex } from '@/components';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';
import { navigate } from '@/services/NavigationService';

const SearchBar: React.FC = () => {
  const theme = useTheme<AppTheme>();
  return (
    <Box marginVertical="2.5" marginHorizontal="2.5">
      <Pressable
        onPress={() => {
          navigate('Search');
        }}>
        <Flex
          paddingHorizontal="x4"
          flexDirection="row"
          alignItems="center"
          height={40}
          overflow="hidden"
          borderRadius="x1"
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
