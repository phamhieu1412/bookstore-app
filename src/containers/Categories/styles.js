import { Platform } from 'react-native';
import Color from '../../common/Color';
import Styles from '../../common/Styles';
const { width } = Styles;

const listItemWidth = width;
// const listColors = ['#FF8A8A', '#95D45A', '#88D3FF', '#FFC635', '#BA9E88', '#912F3C', '#FAB8A0'];

export default {
  listView: {
    flex: 1,
    backgroundColor: Color.backgroundLightGrey,
    paddingHorizontal: 10,
  },
  flatlist: {
    flexDirection: 'column',
    paddingBottom: 40,
    paddingTop: 10,
  },
  categoryContainer: {
    verflow: 'hidden',
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'column',
    borderWidth: 0,
    borderRadius: 0,
    borderColor: 'transparent',
    margin: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    padding: 0,
    borderWidth: 0,
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Color.white,
  },
  titleText: {
    color: Color.Text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.white,
  },
};
