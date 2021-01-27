import { Platform } from 'react-native';
import Color from '../../common/Color';
import Styles from '../../common/Styles';
const { width } = Styles;

const listItemWidth = (width - 11 - 17 * 3) / 3;
// const listColors = ['#FF8A8A', '#95D45A', '#88D3FF', '#FFC635', '#BA9E88', '#912F3C', '#FAB8A0'];

export default {
  listView: {
    flex: 1,
    backgroundColor: Color.backgroundLightGrey,
    paddingLeft: 14,
    paddingRight: 13,
    ...Platform.select({
      android: {
        marginTop: 0,
      },
    }),
  },
  flatlist: {
    flexDirection: 'column',
    paddingBottom: 40,
    paddingTop: 20,
  },
  categoryContainer: {
    verflow: 'hidden',
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'column',
    borderWidth: 0,
    borderRadius: Styles.Radius.productList,
    borderColor: 'transparent',
    width: listItemWidth,
    marginLeft: 5,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    padding: 0,
    borderWidth: 0,
  },
  categoryImage: {
    minHeight: (listItemWidth * 4) / 5,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.lineColor,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '500',
    color: Color.blackTextSecondary,
  },
  titleBackground: background => ({
    backgroundColor: background,
    alignItems: 'flex-start',
    paddingVertical: 5,
  }),
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingHorizontal: 7,
    backgroundColor: Color.white,
  },
  titleText: {
    color: Color.Text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
};
