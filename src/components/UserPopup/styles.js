import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalBoxWrap: {
    position: 'absolute',
    top: (Styles.height * 23) / 100,
    width: (Styles.width * 95) / 100,
    marginLeft: (Styles.width * 2) / 100,
    // backgroundColor: 'transparent',
    zIndex: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContent: {},
  modalImage: {},
  popupImage: {
    width: (Styles.width * 90) / 100,
    height: (Styles.width * 85.5) / 100, // 315x299
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: Color.primary,
    borderRadius: 50,
    width: 29,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 22,
    color: 'white',
  },
});

export default styles;