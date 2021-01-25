import React from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import { Icon } from '../../Omni';

class UserPopup extends React.Component {
  render() {
    const { isModalVisible, imageUrl, closeModal, onPress, style } = this.props;
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
        <View>
          <TouchableWithoutFeedback style={styles.modalContent} onPress={onPress}>
            <FastImage source={{ uri: imageUrl }} style={styles.popupImage} />
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="close" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default UserPopup;
