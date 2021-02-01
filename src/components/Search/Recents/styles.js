import { StyleSheet } from 'react-native';
import Color from '../../../common/Color';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Color.Text,
    fontSize: 16,
    marginRight: 5,
  },
});
