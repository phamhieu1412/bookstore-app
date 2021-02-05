/** @format */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  list: {
    flex: 1,
  },
  hiddenRow: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#d4dce1',
  },
  noteWrapper: {
    paddingHorizontal: 17,
    paddingTop: 21,
    paddingBottom: 21,
    minHeight: 65,
  },
  noteInput: {
    // borderLeftWidth: 1,
    // borderTopWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    paddingTop: 5,
    minHeight: 45,
    fontStyle: 'italic',
    color: '#555',
  },
});
