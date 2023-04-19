/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useRef, useState } from 'react';
import { Box, Text, Switch, Flex, HtmlParse, SButton } from '@/components';
import Modal from 'react-native-modal';
import { scale } from '@/components/helpers/normalize';
import { ScrollView, StyleSheet } from 'react-native';

type Props = {
  article?: string;
  value: boolean;
  onChange: (n: boolean) => void;
};
const Guarantee: React.FC<Props> = ({ value, onChange, article }) => {
  const [show, setShow] = useState(false);
  const memoryHtmlBlock = useMemo(() => {
    return <HtmlParse html={article} />;
  }, [article]);
  return (
    <>
      <Box
        backgroundColor="primary_background"
        paddingVertical="x4"
        paddingHorizontal="2.5">
        <Text variant="h3" mb="2.5">
          安心享
        </Text>
        <Flex justifyContent="space-between">
          <Text
            color="primary50"
            onPress={() => {
              setShow(true);
            }}>
            查看安心享说明
          </Text>
          <Switch value={value} onChange={onChange} />
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
          <Text variant="h3" textAlign="center" mb="x4">
            安心享说明
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: 150,
            }}>
            {memoryHtmlBlock}
          </ScrollView>
          <Flex justifyContent="space-between" marginTop="x5">
            <SButton
              variant="Outline"
              colorScheme="black"
              style={styles.btn}
              onPress={() => {
                onChange(true);
                setShow(false);
              }}>
              开启
            </SButton>
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
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
  },
});

export default Guarantee;
