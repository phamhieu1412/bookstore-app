import { StyleSheet } from 'react-native';

import Styles from '../../common/Styles';
import Color from '../../common/Color';

const styles = StyleSheet.create({
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 10,
    top: (Styles.height * 35) / 100,
    width: (Styles.width * 93) / 100,
    height: 131,
    // flex: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.75)',
    zIndex: 10,
    // right: null,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalMessage: {
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessageText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: Color.white,
    textAlign: 'center',
  },
  modalActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  modalButton: {
    width: 91,
    height: 43,
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 15,
    borderRadius: 35,
  },
  buttonNo: {
    backgroundColor: Color.secondary,
  },
  buttonYes: {
    backgroundColor: Color.primary,
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: -0.1,
    textAlign: 'center',
  },
});

export default styles;