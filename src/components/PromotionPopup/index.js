import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import { Icon } from '../../Omni';
import Color from '../../common/Color';
import AwaredProducts from '../AwaredProducts/index';

class PromotionPopup extends React.Component {
  render() {
    const { isModalVisible, closeModal, style, onToggleNotDisplayPromotionModalAgain } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        // onBackdropPress={closeModal}
        swipeToClose={false}
        animationDuration={300}
        backdropOpacity={0.5}
        // position="top"
        backdropColor="black"
        style={[styles.modalBoxWrap, style && style]}>
        <View style={[styles.wrap, { backgroundColor: Color.background }]}>
          <View style={styles.head}>
            <Text style={[styles.headTitle, { color: Color.Text }]}>
              Chúc mừng bạn đã nhận được khuyến mãi.
            </Text>
            <Text style={[styles.headTitle, { color: Color.Text }]}>
              Vui lòng chọn sản phẩm mình muốn
            </Text>
          </View>
          <AwaredProducts
            showAction
            onToggleNotDisplayPromotionModalAgain={onToggleNotDisplayPromotionModalAgain}
          />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Icon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
      </Modal>
    );
  }
}


export default PromotionPopup;
