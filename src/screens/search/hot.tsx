import request from '@/request';
import { Text, Flex, Box } from '@/components';
import { TouchableOpacity } from 'react-native';
import { memo, useEffect, useState } from 'react';

let dataCache: string[] = [];

async function getData(): Promise<string[]> {
  if (dataCache.length > 0) {
    return dataCache;
  }
  dataCache = await (
    await request('/Include/alipay/data.aspx', {
      params: {
        apiname: 'getsearchconfi',
      },
    })
  ).data.dataList;
  return dataCache;
}

const Hot = ({ onChange }: { onChange: (s: string) => void }) => {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    getData().then(res => {
      console.log(res);
      setData(res);
    });
  }, []);
  return (
    <Box padding="2.5">
      <Text variant="h1" mb="2.5">
        热门搜索:
      </Text>
      <Flex>
        {data.map((item: string, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChange(item);
              }}>
              <Text opacity={1} mr="x4" mb="x4" variant="h2" color="primary200">
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Flex>
    </Box>
  );
};

export default memo(Hot);
