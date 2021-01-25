import { StyleSheet } from 'react-native';

import Constants from '../../common/Constants';
import Styles from '../../common/Styles';
import Color from '../../common/Color';

export default StyleSheet.create({
  flatWrap: {
    flex: 1,
    width: Styles.width,
    paddingLeft: 0,
    marginTop: 0,
    marginBottom: 15,
  },
  mainList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 20,
  },
  // RenderHedearListView
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 18,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  headerRight: {
    flex: 1 / 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 0,
    flexDirection: 'row',
  },
  headerRightText: {
    fontSize: 11,
    marginRight: 0,
    marginTop: 0,
    color: '#666',
    fontFamily: Constants.fontFamily,
  },
  footer: {
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    width: 75,
    paddingTop: 15,
    paddingBottom: 12,
    marginRight: 0,
    color: Color.blackTextSecondary,
    fontFamily: Constants.fontFamily,
  },
  footerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Color.blue,
  },
  headerButton: {
    flexDirection: 'row',
    // width: 75,
    // paddingTop: 15,
    // paddingBottom: 12,
    marginRight: 10,
    color: Color.blackTextSecondary,
    fontFamily: Constants.fontFamily,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.blue,
  },
  icon: {
    fontSize: Styles.FontSize.tiny,
    color: Color.blue,
    marginTop: 2,
    marginLeft: 4,
    backgroundColor: 'transparent',
  },
  tagHeader: {
    fontSize: Styles.FontSize.header,
    color: Color.Header,
    fontWeight: '900',
    fontFamily: Constants.fontHeader,
  },

  // bottom button
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    height: 40,
    minWidth: 160,
    borderRadius: 20,
    paddingHorizontal: 20,
    // borderColor: Color.primary,
    // borderWidth: 1,
    backgroundColor: '#ffebee',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.primary,
  },
});
