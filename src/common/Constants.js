import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Constants = {
  appStoreId: '',
  bundleId: '',
  appsflyerKey: '',
  useReactotron: true,
  Language: 'en', // ar, en. Default to set redux. Only use first time
  VND: '₫',
  fontFamily: 'verdana',
  fontHeader: 'verdana',
  fontHeaderAndroid: 'verdana',
  isoDateFormat: 'YYYY-MM-DD',
  displayDateFormat: 'DD-MM-YYYY',
  allCategorySlug: 'show-all-category',
  Filter: {
    maxPrice: 1000000,
    minPrice: 0,
    defaultPrice: 50000,
    priceStep: 10000,
  },
  AsyncCode: {
    Intro: 'async.intro',
  },
  EmitCode: {
    Toast: 'toast',
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get('window').width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get('window').height * percent;
    },
  },
  Window: {
    width,
    height,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100,
  },

  PostImage: {
    small: 'small',
    medium: 'medium',
    medium_large: 'medium_large',
    large: 'large',
  },
  tagIdBanner: 273, // cat ID for Sticky Products
  Layout: {
    card: 'card',
    twoColumn: 'twoColumn',
    simple: 'simple',
    list: 'list',
    advance: 'advance',
    threeColumn: 'threeColumn',
    horizon: 'horizon',
    twoColumnHigh: 'twoColumnHigh',
    Banner: 'banner',

    categoryBubbles: 'category-bubbles',
    posBasedPromotion: 'pos-based-promotion',
    BannerImage: 'bannerImage',
  },
  pagingLimit: 16,

  fontText: {
    size: 16,
  },
  productAttributeColor: 'color',
};

export default Constants;
