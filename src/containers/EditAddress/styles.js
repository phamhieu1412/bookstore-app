import { StyleSheet } from 'react-native';

import Color from '../../common/Color';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundLightGrey,
  },

  profileSection: {
    // margin: 15,
    // backgroundColor: 'transparent',
  },
  sectionBody: {
    marginTop: 3,
    backgroundColor: Color.backgroundLightGrey,
    // borderRadius: 5,
    overflow: 'hidden',
  },

  formContainer: {
    marginTop: 7,
    backgroundColor: Color.backgroundLightGrey,
  },

  itemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    backgroundColor: Color.background,
    paddingHorizontal: 15,
    // paddingTop: 18,
    // paddingBottom: 18,
    minHeight: 50,
  },
  itemLeftText: {
    color: Color.Text,
    fontSize: 16,
    fontWeight: '400',
  },
  itemRightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  itemRight: color => ({
    backgroundColor: color || Color.Text,
    padding: 5,
    borderRadius: 4,
    minWidth: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
