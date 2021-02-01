import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Constants from '../../common/Constants';

export default StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 85,
  },
  button: {
    height: 40,
    minWidth: 160,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: Color.product.BuyNowButton,
  },
  buttonDisabled: {
    backgroundColor: Color.product.Discount,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Constants.fontHeader,
  },
});
