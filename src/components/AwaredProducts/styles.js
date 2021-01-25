import { View, FlatList, Text, StyleSheet } from 'react-native';

import Color from '../../common/Color';

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    // marginTop: 5,
    paddingTop: 5,
    paddingBottom: 0,
  },
  title: {
    // width: '100%',
    color: Color.Text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
  },
  descText: {
    color: Color.blackTextSecondary,
  },
  button: {
    padding: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;