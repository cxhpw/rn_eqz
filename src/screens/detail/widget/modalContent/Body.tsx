import { Text, Pressable } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { Box, Flex } from 'native-base';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, TextStyle } from 'react-native';

type Props = {
  data: Spec[];
  onChange: (index: number, obj: Spec) => void;
};

const Body: React.FC<Props> = ({ data, onChange }) => {
  const theme = useTheme<AppTheme>();
  const getCheckedStyle = useCallback(
    (checked: boolean): TextStyle => {
      let result: TextStyle = {};
      if (checked) {
        result = {
          borderColor: theme.colors.primary50,
          backgroundColor: theme.colors.primary50,
          color: '#ffffff',
        };
      }
      return result;
    },
    [theme],
  );
  return (
    <Box style={{ flex: 1 }}>
      <ScrollView>
        <Box style={styles.wrapper}>
          {data?.map((item, idx) => {
            return (
              <Box style={styles.box} key={item.name}>
                <Text style={styles.title}>{item.name}</Text>
                <Flex flexWrap="wrap" flexDir="row">
                  {item.children.map((child, childIdx) => (
                    <Pressable
                      scalable={false}
                      key={child.name}
                      onPress={() => onChange(idx, child)}>
                      <Text
                        style={[styles.btn, getCheckedStyle(child.checked)]}>
                        {child.name}
                      </Text>
                    </Pressable>
                  ))}
                </Flex>
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
  },
  box: {
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15,
    color: '#000',
  },
  btn: {
    fontSize: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    height: 25,
    lineHeight: 23,
    borderRadius: 25 / 2,
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#dfdfdf',
    color: '#333',
    overflow: 'hidden',
  },
});

export default Body;
