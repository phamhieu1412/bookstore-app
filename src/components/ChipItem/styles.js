import { StyleSheet } from 'react-native';
import Color from '../../common/Color';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f2f4f8',
    marginRight: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  level1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  level2: {},
  level3: {},
  text: {
    fontSize: 14,
    color: Color.Text,
  },
  selected: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Color.primary,
    color: Color.primary,
  },
  textSelected: {
    color: Color.primary,
  },
});
