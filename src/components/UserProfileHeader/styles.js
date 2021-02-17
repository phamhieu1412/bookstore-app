import { StyleSheet } from 'react-native';

import Color from '../../common/Color';

export default StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  fullName: {
    fontWeight: '600',
    color: Color.blackTextPrimary,
    backgroundColor: 'transparent',
    fontSize: 20,
    marginBottom: 6,
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    //backgroundColor: "#FFF",
    padding: 20,
  },
  avatar: {
    height: 66,
    width: 66,
    borderRadius: 4,
  },
  actionLink: {
    flexDirection: 'row',
  },
  actionText: {
    color: Color.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  actionIcon: {
    color: Color.primary,
    fontSize: 17,
  },
});
