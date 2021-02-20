import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Share from 'react-native-share';

import { toast, Icon, callPhone, IconSLI } from '../../Omni';
import { getName, shouldDisabledReferralCode } from '../../ultils/UserHelpers';
import styles from './styles';
import AppConfig from '../../common/AppConfig.json';
import Languages from '../../common/Languages';
import Color from '../../common/Color';
import files from '../../../assets/filesBase64';
import { numberToVnd } from '../../ultils/NumberFormatter';
// import { UserProfileHeader, UserProfileItem, ShopButton, Spinner } from '@components';
import UserProfileHeader from '../../components/UserProfileHeader';
import ShopButton from '../../components/ShopButton';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // pushNotification: false,
      justLogin: false,
      // currentUserToken: props.userProfile && props.userProfile.token ? props.userProfile.token : '',
      // showEditScreen: this._showEditScreen,
    };

    // props.setAPIToken();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.userProfile && nextProps.userProfile.token && !prevState.currentUserToken) {
  //     if (!nextProps.userProfile.user.name) {
  //       prevState.showEditScreen(true);
  //     }

  //     return { currentUserToken: nextProps.userProfile.token };
  //   } else if (
  //     prevState.currentUserToken &&
  //     (!nextProps.userProfile || !nextProps.userProfile.token)
  //   ) {
  //     return { currentUserToken: '' };
  //   }

  //   return null;
  // }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('focus', () => {
      const { loadUserProfile, userProfile } = this.props;
      // const { userProfile, loadUserProfile, fetchPOS, loadAddressList } = this.props;
      if (userProfile.token) {
        loadUserProfile();
      }
      // fetchPOS();
      // loadAddressList();
    });
  }

  goToLoginScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('SignInScreen', { backRoute: 'Home' });
  };

  _handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    navigation.navigate('Home');
  };

  _showEditScreen = (focusField = '') => {
    const { navigation, userProfile } = this.props;
    const noBackButton = !userProfile || !userProfile.user || !userProfile.user.name;
    navigation.navigate('EditProfileScreen', {
      noBackButton,
      focusField,
    });
  };

  _handlePress = item => {
    const { navigation } = this.props;
    const { routeName } = item;

    if (routeName) {
      navigation.navigate(routeName, item.params);
    }
  };

  myCustomShare = async () => {
    const shareOptions = {
      message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
      url: files.appLogo,
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  _renderEditProfile = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => this._showEditScreen(false)}
        style={styles.headerRight}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <View style={styles.iconWrap}>
          <Icon style={styles.icon} size={18} name={'settings'} />
        </View>
        {/* <Text style={[styles.headerRightText]}>{Languages.Edit}</Text> */}
      </TouchableOpacity>
    );
  };

  _renderGroupHeader = (title, icon) => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.tagHeader}>{title}</Text>
        </View>
        {icon && icon}
      </View>
    );
  };

  _renderShareReferralLink = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={this._onShareReferralLink}
        style={styles.headerRight}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <Icon style={[styles.icon, { color: Color.primary }]} size={13} name="share" />
        <Text style={[styles.headerRightText]}>{Languages.Share}</Text>
      </TouchableOpacity>
    );
  };

  _getReferralLink = () => {
    const {
      userProfile: { user },
    } = this.props;

    // https://ubofood.com/caidat?cref=${user.phone}
    return `${AppConfig.api.url.replace('api', 'caidat')}?cref=${user.phone}`;
  };

  _copyReferralLink = () => {
    Clipboard.setString(this._getReferralLink());
    toast('Đã copy link');
  };

  _onShareReferralLink = async () => {
    try {
      await Share.share({
        subject: 'Link giới thiệu',
        title: 'Link giới thiệu',
        message: this._getReferralLink(),
        url: this._getReferralLink(),
      });
    } catch (error) {
      toast('Có lỗi khi chia sẻ');
    }
  };

  _shouldDisabledReferralCode = () => {
    const { userProfile, myOrders = {} } = this.props;
    const user = userProfile && userProfile.user ? userProfile.user : false;

    return shouldDisabledReferralCode(user, myOrders.orders);
  };

  _goSettings = () => {
    // this.props.navigation.navigate('Home');
      toast(Languages.LoginSuccess);
  }

  render() {
    const { userProfile, navigation } = this.props;
    const user = userProfile.user || {};
    const token = userProfile.token || '';
    const name = getName(user);

    if (!user || !token) {
      return (
        <View style={styles.container}>
          <ScrollView ref="scrollView">
            <UserProfileHeader
              // onLogout={this._handleLogout}
              onEditProfile={() => this._showEditScreen(false)}
              user={{
                ...user,
                name,
              }}
              token={userProfile.token}
            />
          </ScrollView>

          <ShopButton text={Languages.Login} onPress={this.goToLoginScreen} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>

          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <Title style={[styles.title, {
                  marginTop: 15,
                  marginBottom: 5,
                }]}>{user.userName}</Title>
                <Caption style={styles.caption}>@{user.nickname}</Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {
              borderRightColor: '#dddddd',
              borderRightWidth: 1
            }]}>
              <Title>{numberToVnd('140.50')}</Title>
              <Caption>{Languages.Wallet}</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>12</Title>
              <Caption>{Languages.Orders}</Caption>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => navigation.navigate('ShippingAddressScreen')}>
              <View style={styles.menuItem}>
                <Icon name="map-marker-radius" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>{Languages.ShippingAddress}</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => { }}>
              <View style={styles.menuItem}>
                <Icon name="order-bool-descending-variant" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Đơn hàng</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => { }}>
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Thanh Toán</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={this.myCustomShare}>
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Chia sẻ</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => { }}>
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Hỗ trợ</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => this._goSettings()}>
              <View style={styles.menuItem}>
                <IconSLI name="settings" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Cài đặt</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => this._handleLogout()}>
              <View style={styles.menuItem}>
                <IconSLI name="logout" color="#FF6347" size={23} />
                <Text style={styles.menuItemText}>{Languages.Logout}</Text>
              </View>
            </TouchableRipple>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userProfile: user,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions: UserActions } = require('../../redux/UserRedux');
  const { actions: CartActions } = require('../../redux/CartRedux');

  return {
    ...ownProps,
    ...stateProps,
    logout: () => {
      UserActions.logout(dispatch);
      dispatch(CartActions.clearCartToken());
    },
    loadUserProfile: () => {
      dispatch(UserActions.loadUserProfile());
    },
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(UserProfile);
