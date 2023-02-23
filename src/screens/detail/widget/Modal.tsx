import { useContext, useState } from 'react';
import Header from './modalContent/header';
import ProductContext from '../context';
import { Box } from 'native-base';
import { StyleSheet } from 'react-native';
import RNModal from 'react-native-modal';

const Modal = () => {
  const customer = useContext(ProductContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <RNModal
        style={style.modal}
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={() => setIsModalVisible(false)}
        useNativeDriverForBackdrop
        onBackdropPress={() => setIsModalVisible(false)}
        swipeDirection={['down']}>
        <Box style={style.content}>
          <Header data={customer} />
        </Box>
      </RNModal>
    </>
  );
};

const style = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '60%',
    width: '100%',
    margin: 0,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default Modal;
