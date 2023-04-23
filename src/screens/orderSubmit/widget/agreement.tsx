import { ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { memo, useMemo, useState } from 'react';
import { Box, Flex, HtmlParse, SButton, Text, Checkbox } from '@/components';
import { scale } from '@/components/helpers/normalize';

type Props = {
  onChange: (n: boolean) => void;
  value: boolean;
  article?: string[];
};

const Agreement: React.FC<Props> = ({ onChange, value, article: _article }) => {
  const [show, setShow] = useState(false);
  const [article, setArticle] = useState('');
  return (
    <>
      <Box mt="2.5">
        <Flex>
          <Checkbox
            value="cxh"
            size={20}
            shape="circular"
            defaultChecked={value}
            checked={value}
            accessibilityLabel="是否同意用户协议"
            onChange={onChange}>
            <Text color="gray300" ml="x2" variant="p2">
              我同意
            </Text>
            <Text
              color="primary50"
              variant="p2"
              onPress={() => {
                setArticle(_article?.[1] ?? '');
                setShow(true);
              }}>
              《用户租赁与服务协议》
            </Text>
            <Text
              color="primary50"
              variant="p2"
              onPress={() => {
                setArticle(_article?.[0] ?? '');
                setShow(true);
              }}>
              《委托扣款授权书》
            </Text>
          </Checkbox>
        </Flex>
      </Box>
      <Modal
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        isVisible={show}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriverForBackdrop
        onBackdropPress={() => {
          setShow(false);
        }}>
        <Box
          backgroundColor="white"
          width={scale(270)}
          paddingHorizontal="x5"
          paddingVertical="x4">
          <ScrollView
            showsVerticalScrollIndicator={true}
            style={{
              height: 350,
            }}>
            <HtmlParse
              htmlStyle="p{font-size: 12px}div{font-size: 12px}"
              html={article}
            />
          </ScrollView>
          <Flex justifyContent="space-between" marginTop="x5">
            <SButton
              variant="Outline"
              colorScheme="black"
              style={styles.btn}
              onPress={() => {
                setShow(false);
              }}>
              关闭
            </SButton>
          </Flex>
        </Box>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderColor: '#000',
    borderRadius: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
  },
});
export default memo(Agreement);
