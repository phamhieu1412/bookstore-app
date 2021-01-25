import { StyleSheet } from 'react-native';

import Styles from '../../common/Styles';
import Color from '../../common/Color';
import Constants from '../../common/Constants';

const styles = StyleSheet.create({
  wrap: {
    // flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: Color.background,
  },
  head: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
    // paddingLeft: 15,
    // paddingRight: 10,
    // borderBottomWidth: 2,
    // borderStyle: 'solid',
    // borderColor: Color.headerTintColor,
  },
  headTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 3,
    fontFamily: Constants.fontHeader,
    textAlign: 'center',
  },
  flatlist: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // marginTop: 5,
    paddingTop: 5,
    paddingBottom: 20,
  },
  modalBoxWrap: {
    // position: 'absolute',
    margin: 0,
    top: (Styles.height * 23) / 100,
    width: (Styles.width * 95) / 100,
    marginLeft: (Styles.width * 2) / 100,
    padding: 0,
    // backgroundColor: Color.background,
    zIndex: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // modalContent: {
  //   height: 400,
  // },
  modalTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: Color.Text,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -13,
    right: -11,
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