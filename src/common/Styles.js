import { Dimensions, Platform } from 'react-native';

import Constants from './Constants';
import Device from './Device';
import Color from './Color';
import Config from './Config';

const { height, width } = Dimensions.get('window');
const GRID_PADDING_LEFT = 4;
const GRID_PADDING_RIGHT = 5;
const GRID_ITEM_MARGIN = 5;
// const GRID_ITEM_PADDING_LEFT = 10;
// const GRID_ITEM_PADDING_RIGHT = 7;
const listItemHalfWidth =
  (width - 10 - GRID_PADDING_LEFT - GRID_PADDING_RIGHT) / 2 - GRID_ITEM_MARGIN;
const headerHeight = Platform.OS === 'ios' ? 40 : 56;

const Styles = {
  width,
  height: Platform.OS !== 'ios' ? height : height - 20,
  navBarHeight: Platform !== 'ios' ? height : 0,
  headerHeight,
  topNavBarHeight: headerHeight - Device.ToolbarHeight,

  thumbnailRatio: 1.2, // Thumbnail ratio, the product display height = width * thumbnail ratio

  app: {
    flexGrow: 1,
    // backgroundColor: Device.isIphoneX ? '#FFF' : '#000',
    // paddingTop: Device.ToolbarHeight,
  },
  statusBar: {
    height: Device.ToolbarHeight,
  },
  transparentStatusBar: {
    height: Device.ToolbarHeight,
    backgroundColor: 'transparent',
  },
  customNavContainter: {
    height: headerHeight + Device.ToolbarHeight + 20,
  },
  customNavBar: {
    marginTop: 25,
    height: headerHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  FontSize: {
    tiny: 12,
    small: 14,
    medium: 16,
    big: 18,
    large: 20,
    default: 14,
    header: 15,
  },
  IconSize: {
    TextInput: 25,
    ToolBar: 22,
    Inline: 20,
    SmallRating: 14,
  },
  FontFamily: {},
  Radius: {
    productList: 4,
    base: 5,
  },
};

Styles.Common = {
  listContainer: {
    flex: 1,
  },
  flatlist: {
    flexDirection: 'row',
    backgroundColor: Color.sectionBackground,
  },
  columnFlatlist: {
    flex: 1,
    paddingLeft: GRID_PADDING_LEFT,
    paddingRight: GRID_PADDING_RIGHT,
    backgroundColor: Color.sectionBackground,
  },
  itemColumn: {
    overflow: 'hidden',
    width: listItemHalfWidth,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'column',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: Styles.Radius.base,
    margin: GRID_ITEM_MARGIN,
    marginTop: 10,
    marginBottom: 15,
    // backgroundColor: colors.snow,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'rgba(0,0,0, .2)',
    //     shadowOffset: { height: 0, width: 0 },
    //     shadowOpacity: 1,
    //     shadowRadius: 1,
    //   },
    //   android: {
    //     elevation: 1,
    //   },
    // }),
  },
  itemColumnHover: {
    borderColor: Color.border,
  },
  itemColumnImageWrapper: {
    width: '100%',
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 3,
    paddingBottom: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  itemColumnImage: {
    position: 'relative',
    width: '100%',
    height: (listItemHalfWidth * 2) / 3,
    marginTop: 0,
    marginBottom: 0,
  },
  itemBriefInfo: {
    paddingLeft: 10,
    paddingRight: 7,
  },
  shadowBottom: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
    marginBottom: 1,
  },

  ColumnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ColumnCenterTop: {
    alignItems: 'center',
  },
  ColumnCenterBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ColumnCenterLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ColumnCenterRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  Row: {
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        top: !Config.showStatusBar ? (Device.isIphoneX ? -10 : -9) : Device.isIphoneX ? -5 : -3,
      },
      android: {
        top: 0,
      },
    }),
  },
  RowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RowCenterTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RowCenterBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  RowCenterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RowCenterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  RowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // More traits

  logo: {
    width: Platform.OS === 'ios' ? 180 : 200,
    height: Platform.OS === 'ios' ? 30 : 30,
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        marginTop: Device.isIphoneX ? -40 : Config.showStatusBar ? -4 : -15,
      },
      android: {
        marginTop: 2,
        marginLeft: 30,
      },
    }),
  },

  toolbar: () => ({
    // marginTop: Device.ToolbarHeight + (Device.isIphoneX ? 0 : 5),
    backgroundColor: Color.background,
    // zIndex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',

    ...Platform.select({
      ios: {
        // height: Config.showStatusBar ? (Device.isIphoneX ? 10 : 45) : Device.isIphoneX ? 10 : 30,
      },
      android: {
        // height: 52,
        // paddingTop: 6,
        // marginTop: 0,
        elevation: 0,
      },
    }),
  }),

  headerStyle: {
    color: Color.category.navigationTitleColor,
    fontSize: 16,
    fontWeight: '600',
    // lineHeight: 25,
    textAlign: 'left',
    // alignSelf: 'center',
    flex: 1,
    // height: 45,
    backgroundColor: 'transparent',

    fontFamily: Constants.fontFamily,
    ...Platform.select({
      ios: {
        marginBottom: Device.isIphoneX ? 12 : 5,
      },
      android: {
        marginTop: 0,
      },
    }),
  },
  headerTitleStyle: {
    color: Color.category.navigationTitleColor,
    fontSize: 16,
    height: 40,
    textAlign: 'center',
    fontFamily: Constants.fontFamily,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        marginBottom: !Config.showStatusBar ? 14 : 0,
        marginTop: Device.isIphoneX ? -10 : 12,
      },
      android: {
        marginTop: 25,
      },
    }),
  },
  headerStyleWishList: {
    color: Color.category.navigationTitleColor,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Constants.fontFamily,
    marginBottom: !Config.showStatusBar ? (Device.isIphoneX ? 40 : 15) : Device.isIphoneX ? 25 : 5,
  },
  toolbarIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',

    // marginRight: 18,
    // marginBottom: 12,
    marginLeft: 18,
    opacity: 0.8,
    ...Platform.select({
      ios: {
        top: !Config.showStatusBar ? (Device.isIphoneX ? -20 : -8) : Device.isIphoneX ? -15 : 0,
      },
      android: {
        top: 0,
      },
    }),
  },
  viewCover: {
    backgroundColor: '#FFF',
    zIndex: 99999,
    bottom: 0,
    left: 0,
    width,
    height: 20,
    // position: "absolute",
  },
  viewCoverWithoutTabbar: {
    backgroundColor: '#FFF',
    zIndex: 99999,
    bottom: 0,
    left: 0,
    width,
    height: 35,
    position: 'absolute',
  },

  viewBack: {
    ...Platform.select({
      ios: {
        marginTop: Device.isIphoneX ? -25 : -5,
      },
    }),
  },
  toolbarIconBack: {
    width: 16,
    height: 16,
    resizeMode: 'contain',

    marginRight: 18,
    marginBottom: 0,
    marginLeft: 18,
    opacity: 0.8,
    ...Platform.select({
      ios: {
        top: !Config.showStatusBar ? 4 : Device.isIphoneX ? 4 : 8,
      },
      android: {
        top: 0,
      },
    }),
  },
};

export default Styles;
