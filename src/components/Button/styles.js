import { StyleSheet } from "react-native";

import Color from '../../common/Color';

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    padding: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  tabActiveText: {
    color: Color.product.TabActiveText,
  },
  tabIndicator: {
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left',
    width: 60,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  activeIndicator: {
    backgroundColor: Color.product.TabActive,
  },
  // tabActive: {
  //   marginTop: 1,
  //   borderBottomWidth: 4,
  //   borderBottomColor: Color.product.TabActive,
  // },
  button: {
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 20,
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 17,
    // marginTop: 3,
  },
  borderButton: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  tabButton: {
    // height: 50,
    justifyContent: 'center',
  },
  tabButtonText: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'left',
    fontSize: 12,
  },
  loading: {
    marginLeft: 5,
  },
});

export default styles;