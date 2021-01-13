import AppConfig from './AppConfig.json';

export default {
  primary: AppConfig.MainColor, // '#FF0025'
  secondary: AppConfig.SecondColor, // '#4CD964'

  // navigation bar
  headerTintColor: '#1CB5B4',

  // bottom tab bar
  tabbar: 'rgba(255, 255, 255, 1)',
  tabbarTint: AppConfig.MainColor, // '#FF0025'
  tabbarColor: '#8E8E93',

  // wishlist
  heartActiveWishList: AppConfig.MainColor,

  // step indicate from the checkout page
  checkout: {
    stepActive: '#2AB5B3',
    discount: '#CA7100',
  },

  // Product tabs
  product: {
    TabActive: AppConfig.MainColor,
    TabDeActive: 'white',
    TabActiveText: '#333',
    TabText: '#333',
    BuyNowButton: AppConfig.MainColor,
    OutOfStockButton: '#a44',
    ViewBorder: '#bcbebb',
    Text: '#333',
    TextLight: 'darkgray',
    TextDark: '#000000',
    InfoBorder: '#D1D1D6',
    Discount: '#fc95b3',
  },

  // login screen color
  login: {
    facebook: '#3b5998',
    google: '#d34836',
  },

  category: {
    navigationBarColor: '#ffffff',
    navigationBarIcon: 'rgba(0, 0, 0, 0.3)',
    navigationTitleColor: 'rgba(0, 0, 0, 0.8)',
  },

  // common
  Text: '#333',
  Header: '#000',
  background: '#fff',
  backgroundLightGrey: '#ebeef5',
  border: '#979797',
  productTitle: '#404852',
  sectionBackground: '#fff',
  sectionSeparatorColor: '#D8D8D8',
  lineColor: '#f9f9f9',

  error: '#f44336',
  accent: '#FFC107',
  accentLight: '#FFD54F',
  blackTextPrimary: '#000000',
  blackTextSecondary: '#8E8E93',
  blackTextDisable: 'rgba(0,0,0,0.3)',

  lightTextPrimary: 'rgba(255,255,255,1)',
  lightTextSecondary: 'rgba(255,255,255,255.5)',
  lightTextDisable: 'rgba(255,255,255,0.3)',

  lightDivide: 'rgba(255,255,255,0.12)',
  blackDivide: 'rgba(0,0,0,0.05)',
  DirtyBackground: '#F0F0F0',

  // Text
  spin: '#333333',

  attributes: {
    black: '#333',
    red: '#DF3737',
    green: '#2AB5B3',
    blue: '#38B1E7',
    yellow: '#FDF12C',
  },
  black: '#000000',
  white: 'white',
  lightGrey: '#8E8E93',
  darkGrey: '#616161',
  organge: '#FF5055',

  darkOrange: 'rgba(255, 132, 11, 1)',
  darkYellow: 'rgba(255, 164, 31, 1)',
  yellow: 'rgba(255, 198, 53, 1)',
  darkRed: '#8B0000',
  red: '#FF0000',
  lightgrey: '#D3D3D3',
  green: '#008535',
  blue: '#2680eb',
  lightBlue: '#007AFF',
  blue1: 'rgba(30, 165, 233, 1)',
  blue2: 'rgba(3, 207, 254, 1)',

  starRating: '#FDF12C',
};
