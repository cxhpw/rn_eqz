import { Box, Pressable, Text, Portal } from '@/components';
import { ONE_PIXEL, scale } from '@/components/helpers/normalize';
import React, { forwardRef, memo, useMemo, useState } from 'react';
import { StyleSheet, Keyboard, ViewStyle } from 'react-native';
import area from './area.json';
import Picker from 'react-native-picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface Props {
  value?: string[];
  style?: ViewStyle;
  onChange?: (res: string[]) => void;
  brief?: JSX.Element;
}

const PickerRegion: React.ForwardRefRenderFunction<any, Props> = (
  { onChange, value = [], brief, style },
  ref,
) => {
  const [_value, setValue] = useState<any[]>(() => value);
  const [isShow, setIsShow] = useState<boolean>(false);
  const d = useMemo(() => {
    let data: any = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
      let city: any = [];
      for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
        let _city: any = {};
        _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
        city.push(_city);
      }
      let _data: any = {};
      _data[area[i].name] = city;
      data.push(_data);
    }
    return data;
  }, []);
  const Brief = brief && (
    <>
      {typeof brief === 'string' ? (
        <Text variant="p2" color="gray300">
          {brief}
        </Text>
      ) : (
        brief
      )}
    </>
  );
  return (
    <>
      <Pressable
        scalable={false}
        activeOpacity={1}
        ref={ref}
        onPress={() => {
          Keyboard.dismiss();
          if (!isShow) {
            setIsShow(true);
            Picker.init({
              pickerData: d,
              pickerConfirmBtnText: '确定',
              pickerCancelBtnText: '取消',
              pickerTitleText: '请选择',
              selectedValue: _value,
              pickerBg: [255, 255, 255, 1],
              pickerToolBarBg: [255, 255, 255, 1],
              onPickerConfirm: res => {
                setIsShow(false);
                setValue(res);
                onChange?.(res);
              },
              onPickerCancel: () => {
                setIsShow(false);
              },
            });
            Picker.show();
          }
        }}>
        <Box flexDirection="row" marginTop="x1">
          <Text style={[styles.label]} variant="p1" color="gray500">
            所在区域
          </Text>
          <Box flex={1}>
            <Box
              height={scale(40)}
              justifyContent="center"
              borderBottomColor="border"
              style={[style]}
              borderBottomWidth={ONE_PIXEL}>
              <Text color={`${value.length === 0 ? 'gray300' : 'text'}`}>
                {value.length ? value.join('、') : '请选择所在地址'}
              </Text>
            </Box>
            {Brief}
          </Box>
        </Box>
      </Pressable>
      <Portal>
        {isShow ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.4)',
            }}
          />
        ) : null}
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    width: 60,
    textAlign: 'right',
    marginRight: 15,
    lineHeight: scale(40),
  },
});

export default memo(forwardRef(PickerRegion));
