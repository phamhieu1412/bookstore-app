import { Platform } from 'react-native';

import Color from '../../common/Color';

export default {
  container: {
    flex: 1,
    backgroundColor: Color.background,
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 13,
    color: '#bdc2cc',
  },
  value: {
    fontSize: 16,
    color: Color.primary,
  },
  slideWrap: {
    marginHorizontal: 20,
  },
  pricing: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: Color.Text,
  },
  btnFilter: {
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.primary,
    marginHorizontal: 15,
    marginVertical: 10,
    marginTop: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 1,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  clearFilter: {
    fontSize: 16,
    color: Color.primary,
  },
  btnClear: {
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
};
