import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
// import { isObject } from 'lodash';

import { toast } from '../../Omni';
// import { logEventInitiatedCheckout } from '../../api/eventLogger';
import { convertCartItemToProduct } from '../../ultils/Product';

import MyCart from './MyCart';
import CartEmpty from './Empty';
import BottomActions from './BottomActions';
import styles from './styles';
import Languages from '../../common/Languages';
import Spinner from '../../components/Spinner';

class Cart extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    onViewProduct: PropTypes.func,
    orderItems: PropTypes.array,
    onViewHome: PropTypes.func,
  };

  static defaultProps = {
    orderItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.user,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('focus', () => {
      const { user, loadUserProfile, fetchCart, clearCoupon, getAddressList } = this.props;
      
      if (user.token) {
        fetchCart(user.token);
        getAddressList();
        clearCoupon();
        loadUserProfile();
      }
    });

  }

  componentWillUnmount() {
    this._navListener();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { currentUser } = prevState;
  //   if (!currentUser || !currentUser.token) {
  //     const { user, navigation } = nextProps;
  //     if (user && user.token) {
  //       if (!user.user.defaultPosCode) {
  //         navigation.navigate('EditProfileScreen', { noBackButton: true });
  //       }

  //       return { currentUser: user };
  //     }
  //   }

  //   return null;
  // }

  doLogin = () => {
    const { navigation } = this.props;
    this.props.navigation.navigate('LoginScreen', {
      onBack: () => navigation.navigate('CartScreen'),
    });
  };

  goToCheckout = () => {
    const { navigation, carts } = this.props;
      navigation.navigate('CheckoutScreen');

      // eventLogger
      // logEventInitiatedCheckout(carts);
  };

  onViewProduct = product => {
    const { onViewProduct } = this.props;
    onViewProduct(convertCartItemToProduct(product));
  };

  render() {
    const { navigation, orderItems, onViewHome, carts, user, isFetching } = this.props;

    if (orderItems && orderItems.length === 0) {
      return <CartEmpty onViewHome={onViewHome} />;
    }

    const loggedIn = user && user.token;
    const completedRegistration = loggedIn;
    return (
      <View style={[styles.fill]}>
        <View style={styles.content}>
          <MyCart
            key="cart"
            onPrevious={this.onPrevious}
            navigation={navigation}
            onViewProduct={this.onViewProduct}
          />

          <BottomActions
            carts={carts}
            onPrevious={this.onPrevious}
            nextText={
              loggedIn
                ? completedRegistration
                  ? Languages.FinishCart
                  : Languages.AddInfo
                : Languages.LoginToContinue
            }
            onNext={loggedIn ? this.goToCheckout : this.doLogin}
          />
        </View>
        
        {isFetching ? <Spinner mode="overlay" /> : null}
      </View>
    );
  }
}

const mapStateToProps = ({ carts, user }) => ({
  carts,
  orderItems: carts.orderItems,
  cartToken: carts.token,
  user,
  isFetching: carts.isFetching, // || carts.isFetching, // to prevent showing too many loading
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  // const { netInfo, carts, user } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions: CartActions } = require('../../redux/CartRedux');
  const { actions: UserActions } = require('../../redux/UserRedux');

  return {
    ...ownProps,
    ...stateProps,
    loadUserProfile: () => {
      // if (!netInfo.isConnected) return false; // no toast because we also call fetchCart
      UserActions.loadUserProfile(dispatch);
    },
    fetchCart: (token) => {
      dispatch(CartActions.fetchCart(token));
    },
    clearCoupon: () => {
      dispatch(CartActions.clearCoupon());
    },
    getAddressList: () => {
      dispatch(UserActions.loadAddressList());
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Cart);
