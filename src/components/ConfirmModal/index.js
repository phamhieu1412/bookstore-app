import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import Button from '../Button/Button';
import styles from './styles';
import Languages from '../../common/Languages';

class ConfirmModal extends React.Component {
  render() {
    const {
      isModalVisible,
      messageText,
      closeModal,
      onPressYes,
      onPressCancel,
      yesText,
      cancelText,
      style,
    } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        swipeToClose={false}
        animationDuration={300}
        backdropOpacity={0.1}
        // position="top"
        style={[styles.modalBoxWrap, style && style]}
      >
        <View style={styles.modalMessage}>
          <Text style={styles.modalMessageText}>{messageText}</Text>
        </View>

        <View style={styles.modalActions}>
          <Button
            style={[styles.modalButton, styles.buttonNo]}
            textStyle={styles.buttonText}
            onPress={onPressCancel || closeModal}
            text={cancelText || Languages.NO}
          />
          <Button
            style={[styles.modalButton, styles.buttonYes]}
            textStyle={styles.buttonText}
            onPress={onPressYes}
            text={yesText || Languages.YES}
          />
        </View>
      </Modal>
    );
  }
}

export default ConfirmModal;
