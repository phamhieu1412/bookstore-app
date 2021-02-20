import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, StatusBar, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';

import { toast } from '../Omni';
import { FocusSearch, CartWishListIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import { checkPromotionGiftProducts } from '../ultils/Product';
import Languages from '../common/Languages';
import Constants from '../common/Constants';
import Color from '../common/Color';
import Styles from '../common/Styles';
import Images from '../common/Images';
import ParallaxHeader from '../components/ParallaxHeader';
import ConfirmModal from '../components/ConfirmModal';
import UserPopup from '../components/UserPopup';
import PromotionPopup from '../components/PromotionPopup';
import Home from '../containers/Home/index';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textColor: Color.background,
      statusBarStyle: 'light-content',
      endReached: false,
      hasNewVersion: false,
      isNewVersionModalOpen: false,
      currentPopup: '',
      popupViewing: false,
      isPopupModalOpen: false,
      isPromotionModalOpen: false,
      currentPromotionId: '',
      donotDisplayPromotionAgain: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { navigation, fetchCart, user } = this.props;

    navigation.setOptions({
      headerTitle: null,
    });

    this._navListener = navigation.addListener('focus', () => {
      const { statusBarStyle } = this.state;
      setBarStyle(statusBarStyle);
      setTranslucent(true);
      setBackgroundColor('transparent');
      // fetchCart(user.token);
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  updateStatusBarStyle = newStyle => {
    setBarStyle(newStyle);
    setTranslucent(true);
    setBackgroundColor('transparent');

    let color;
    if (newStyle === 'light-content') {
      color = '#ffffff';
    } else {
      color = '#000000';
    }

    this.setState({ textColor: color, statusBarStyle: newStyle });
  };

  setEndReached = status => {
    this.setState({ endReached: status });
  };

  closeNewVersionModal = () => {
    this.setState({ isNewVersionModalOpen: false });
  };

  goToStore = () => {
    const APP_STORE_LINK = `itms-apps://itunes.apple.com/app/apple-store/id${Constants.appStoreId}?mt=8`;
    const PLAY_STORE_LINK = `market://details?id=${Constants.bundleId}`;
    const storeLink = Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK;

    this.closeNewVersionModal();
    Linking.openURL(storeLink).catch(() => {
      toast('Có lỗi khi cập nhật');
    });
  };

  closePopupModal = (clicked = false) => {
    if (clicked) {
      this.props.setClickedPopup(this.state.currentPopup);
    } else {
      this.props.setViewedPopup(this.state.currentPopup);
    }
    this.setState({ isPopupModalOpen: false });
  };

  closePromotionModal = () => {
    this.setState({ isPromotionModalOpen: false });
    if (this.state.donotDisplayPromotionAgain) {
      const { setDonotDisplayAgain } = this.props;

      setDonotDisplayAgain();
    }
  };

  onToggleNotDisplayPromotionModalAgain = () => {
    const donotDisplayPromotionAgain = !this.state.donotDisplayPromotionAgain;
    this.setState({ donotDisplayPromotionAgain });
  };

  goToBannerLink = bannerIndex => {
    const { homeBanner } = this.props;
    const currentBanner = homeBanner[bannerIndex] || {};
    if (currentBanner.type === 'product') {
      this.viewProductScreen({ product: { slug: `fake-${currentBanner.code}` } });
    } else if (currentBanner.type === 'category') {
      this.findAndGoToCategoryScreen(currentBanner.code);
    } else if (currentBanner.type === 'promotion') {
      this.viewPromotionPage();
    }
  };

  goToPopupLink = () => {
    const { currentPopup } = this.state;
    if (currentPopup.type === 'product') {
      this.viewProductScreen({ product: { slug: `fake-${currentPopup.code}` } });
    } else if (currentPopup.type === 'category') {
      this.findAndGoToCategoryScreen(currentPopup.code);
    } else if (currentPopup.type === 'promotion') {
      this.viewPromotionPage();
    }
    this.closePopupModal(true);
  };

  viewProductScreen = params => {
    const {
      navigation: { navigate }, getBookDetail,
    } = this.props;
    
    getBookDetail(params.product.id);
    navigate('DetailScreen', params);
  };

  findAndGoToCategoryScreen = categoryCode => {
    const { allCategories } = this.props;
    const findCategory = allCategories.find(item => item.code === categoryCode);
    if (findCategory) {
      this.viewCategoryScreen({
        mainCategory: findCategory,
      });
    }
  };

  viewCategoryScreen = params => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('CategoryScreen', params);
  };

  viewPromotionPage = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('ListAllScreen', {
      config: { name: 'hotDeal', predefined: 'hot-deal' },
      index: 1,
    });
  };

  renderNavBar = () => {
    const { navigation } = this.props;
    const { textColor, statusBarStyle } = this.state;
    const colorScheme = statusBarStyle.replace('-content', '');
    return (
      <View style={Styles.customNavContainter}>
        <View style={Styles.transparentStatusBar} />
        <View style={Styles.customNavBar}>
          <View>{FocusSearch(navigation, colorScheme)}</View>
          <View style={styles.iconRight}>{CartWishListIcons(navigation, textColor)}</View>
        </View>
      </View>
    );
  };

  renderNewVersionModal() {
    return (
      <ConfirmModal
        isModalVisible={this.state.isNewVersionModalOpen}
        messageText={'Đã có phiên bản mới, hãy cập nhật để có trải nghiệm tốt nhất!'}
        closeModal={this.closeNewVersionModal}
        onPressYes={this.goToStore}
        yesText={Languages.Update}
        cancelText={Languages.Later}
        style={{ height: 151 }}
      />
    );
  }

  renderPopupModal() {
    return (
      <UserPopup
        isModalVisible={this.state.isPopupModalOpen}
        imageUrl={this.state.currentPopup.appImage}
        closeModal={() => this.closePopupModal(false)}
        onPress={this.goToPopupLink}
        style={{ height: 151 }}
      />
    );
  }

  renderPromotionModal() {
    const { awardedProducts, viewedProducts, donotDisplayPromotionModalAgain } = this.props;
    if (
      donotDisplayPromotionModalAgain ||
      !awardedProducts ||
      !awardedProducts.length ||
      !viewedProducts ||
      !Object.keys(viewedProducts).length
    ) {
      return <View />;
    }

    return (
      <PromotionPopup
        isModalVisible={this.state.isPromotionModalOpen}
        closeModal={() => this.closePromotionModal()}
        onToggleNotDisplayPromotionModalAgain={this.onToggleNotDisplayPromotionModalAgain}
        style={{ height: 151 }}
      />
    );
  }

  onShowAll = (config, index) => {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { predefined, code } = config;
    if (predefined === 'category') {
      this.findAndGoToCategoryScreen(code);
    } else {
      navigate('ListAllScreen', { config, index });
    }
  };

  render() {
    const { navigation, homeBanner, awardedProducts } = this.props;
    const { navigate } = navigation;
    const {
      endReached,
      popupViewing,
      currentPopup,
      isPromotionModalOpen,
      isPopupModalOpen,
      isNewVersionModalOpen,
      hasNewVersion,
    } = this.state;
    const banners = [
      require('../images/banners/banner_01.jpg'),
      require('../images/banners/banner_02.jpg'),
      require('../images/banners/banner_03.jpg'),
    ]

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          animated={false}
          backgroundColor="transparent"
          translucent
        />
        <ParallaxHeader
          backgroundImage={banners}
          onPressImage={this.goToBannerLink}
          autoPlayImage={!isPopupModalOpen && !isPromotionModalOpen && !isNewVersionModalOpen}
          onChangeStatusBarStyle={this.updateStatusBarStyle}
          setEndReached={this.setEndReached}
          renderNavBar={this.renderNavBar}
          renderContent={() => (
            <Home
              onShowAll={this.onShowAll}
              endReached={endReached}
              showCategoriesScreen={() => navigate('CategoriesScreen')}
              onViewProductScreen={this.viewProductScreen}
              onViewCategory={this.viewCategoryScreen}
            />
          )}
        />
        {}
        {awardedProducts && awardedProducts.length
          ? this.renderPromotionModal()
          : popupViewing && currentPopup
            ? this.renderPopupModal()
            : hasNewVersion
              ? this.renderNewVersionModal()
              : null}
      </View>
    );
  }
}

const mapStateToProps = ({ }) => ({
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: cartAction } = require('../redux/CartRedux');
  const ProductRedux = require('../redux/ProductRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchCart: cartToken => {
      if (cartToken) {
        dispatch(cartAction.fetchCart(cartToken));
      }
    },
    getBookDetail: productId => {
      dispatch(ProductRedux.actions.getBookDetail(productId));
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(HomeScreen);

const styles = StyleSheet.create({
  navContainer: {
    height: Styles.headerHeight + Styles.statusBar.height,
  },
  navBar: {
    marginTop: 25,
    height: Styles.headerHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
});