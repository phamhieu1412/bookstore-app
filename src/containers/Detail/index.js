import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { find } from 'lodash';

import { UboIcon } from '../../Omni';
// import * as Animatable from 'react-native-animatable';
import cartStyles from '../Cart/styles';
import {
  getProductImageSource,
  getProductPrice,
  currencyFormatter,
  getPricePerMeasurementUnit,
  checkGiftProduct,
} from '../../ultils/Product';
import ReadMoreDescription from './ReadMoreDescription.js';
import styles from './ProductDetail_Style';
// import { logEventViewProduct } from '../../api/eventLogger';
import Button from '../../components/Button/Button';
import ProductRelated from '../../components/ProductRelated';
import ProductRating from '../../components/ProductRating';
import ProductTitle from '../../components/ProductTitle';
import ProductMeta from '../../components/ProductMeta';
import ProductGiftTag from '../../components/ProductGiftTag';
import Spinner from '../../components/Spinner';
import Languages from '../../common/Languages';
import Color from '../../common/Color';
import Constants from '../../common/Constants';

const PRODUCT_IMAGE_HEIGHT = 300;

class Detail extends Component {
  static propTypes = {
    product: PropTypes.any,
    getBookDetail: PropTypes.func,
    productDetail: PropTypes.any,
    onViewCart: PropTypes.func,
    carts: PropTypes.any,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const {
      // carts: { orderItems },
      cartItemIndex,
    } = props;

    // const cartItem = cartItemIndex >= 0 ? orderItems[cartItemIndex] : false;

    this.state = {
      tabIndex: 0,
      quantity: 1,
      currentProductSlug: '',
      isCriteriaModalOpen: false,
      startCriteriaImage: 0,
    };

    this.scrollViewRef = React.createRef();
    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;
    this.inCartTotal = 0;
    this.isInWishList = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    return null;
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('focus', () => {
      const { getBookDetail, product, params, getPublisherById, getAuthorById, fetchBooksByCategory, getReviewsBook } = this.props;
      getBookDetail(product.id);
      getReviewsBook(product.id);
      // getPublisherById(product.publisher_id ? product.publisher_id : product.publisherId);
      // getAuthorById(product.author_id ? product.author_id : product.authorId );
      if(product.category && product.category.id) {
        fetchBooksByCategory({category: product.category.id});
      }
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  closeCriteriaPhotoModal = () => {
    this.setState({ isCriteriaModalOpen: false });
  };

  openCriteriaPhotoModal = (index = 0) => {
    this.setState({ isCriteriaModalOpen: true, startCriteriaImage: index });
  };

  handleClickTab(tabIndex) {
    this.setState({ tabIndex });
    // Timer.setTimeout(() => this.state.scrollY.setValue(0), 50);
  }

  onClickPlus = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  onClickMinus = () => {
    this.setState({ quantity: Math.max(1, this.state.quantity - 1) });
  };

  getWishList = (props, check = false) => {
    const { product, navigation, wishListItems, route } = props;

    if (props.hasOwnProperty('wishListItems')) {
      if (check === true && props.wishListItems === this.props.wishListItems) {
        return;
      }
      this.isInWishList =
        find(props.wishListItems, item => item.slug === product.slug) !== 'undefined';

      const sum = wishListItems.length;
      const params = route;
      params.wistListTotal = sum;
      this.props.navigation.setParams(params);
    }
  };

  /**
   * render Image top
   */
  _renderImages = () => {
    const { productDetail } = this.props;
    const onSale = productDetail && productDetail.price;

    return (
      <View style={[
          styles.imageWrapper,
          onSale ? { borderWidth: 2, borderColor: Color.product.Discount, borderRadius: 7 } : {},
        ]}>
        {
          productDetail && productDetail.images && productDetail.images.length > 0 && (
            <Image
              source={getProductImageSource(productDetail.images[0])} // @TODO: change back to mobiDetailUrl
              style={[
                styles.imageProduct,
                // onSale ? { borderWidth: 2, borderColor: Color.product.Discount, borderRadius: 7 } : {},
              ]}
              resizeMode="contain"
            />
          )
        }
      </View>
    );
  };

  /**
   * Render tabview detail
   */
  _renderTabView = () => {
    const { productDetail } = this.props;
    if (!productDetail) return null;

    return (
      <View style={[styles.tabView, { backgroundColor: Color.background }]}>
        <View style={[styles.tabButton]}>
          <View style={styles.tabItem}>
            <Button
              type="tab"
              textStyle={styles.textTab}
              selectedStyle={{ color: Color.Text }}
              text='Thông tin về sách'
              onPress={() => this.handleClickTab(0)}
              selected={this.state.tabIndex === 0}
            />
          </View>
          <View style={styles.tabItem}>
            <Button
              type="tab"
              textStyle={[styles.textTab]}
              selectedStyle={{ color: Color.Text }}
              text='Thông tin về tác giả'
              onPress={() => this.handleClickTab(1)}
              selected={this.state.tabIndex === 1}
            />
          </View>
        </View>
        {
          this.state.tabIndex === 0 && productDetail.quotesAbout ? 
          (
            <ReadMoreDescription
              shortText={productDetail.quotesAbout}
              textStyle={styles.description}
            >
            </ReadMoreDescription>
          ) : null
        }
        {
          this.state.tabIndex === 1 && (
            <View>
              <ReadMoreDescription
                shortText={productDetail && productDetail.author && productDetail.author.id && productDetail.author.name}
                textStyle={{padding: 10, fontSize: 12, alignItems: 'flex-start'}}
              >
              </ReadMoreDescription>
              <Text style={styles.description}>
                {productDetail && productDetail.author && productDetail.author.info}
              </Text>
            </View>
          )
        }
      </View>
    );
  };

  // viewProductScreen = params => {
  //   const {
  //     navigation: { navigate },
  //   } = this.props;
  //   navigate('DetailScreen', params);
  // };
  _renderProductRating = (title, reviews, reviewObj) => {
    const { onViewProductScreen, getBookDetail, productDetail } = this.props;
    return (
      <ProductRating
        // onViewProductScreen={product => {
        //   this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        //   getBookDetail(product.product.id);
        //   // getPublisherById(product.product.publisher_id);
        //   // getAuthorById(product.product.author_id);
        //   // fetchCategoriesById(product.product.category_id);
        // }}
        title={title}
        reviews={reviews}
        reviewObj={reviewObj}
      />
    );
  };

  _renderProductRelated = (title, products) => {
    const { onViewProductScreen, getBookDetail, productDetail } = this.props;
    let array = products;
    array = array.filter(( obj ) => {
      return obj.id !== productDetail.id;
    });
    return (
      <ProductRelated
        onViewProductScreen={product => {
          this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
          getBookDetail(product.product.id);
          // getPublisherById(product.product.publisher_id);
          // getAuthorById(product.product.author_id);
          // fetchCategoriesById(product.product.category_id);
        }}
        title={title}
        products={array}
      />
    );
  };

  _goBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  _onAddToCart = () => {
    const { user, productDetail, navigation, addToCart } = this.props;
    if (!user.token) {
      navigation.navigate('SignInScreen', { onBack: () => navigation.navigate('DetailScreen') });
    } else {
      addToCart(
        { product_id: productDetail.id, quantity: this.state.quantity }, 
        {
          onSuccess: () => {
            navigation.goBack(null);
          },
          onFailure: () => {
          },
        }
      );
    }
  };

  _renderButtons = () => {
    const {
      productDetail,
      isBuyOne,
      isRequiredLogin,
      cartItemIndex,
      user
      // carts: { orderItems },
    } = this.props;

    if (!productDetail || !productDetail.price) {
      return null;
    }
    const isGiftProduct = checkGiftProduct(productDetail);
    const { quantity } = this.state;
    const btnText = isRequiredLogin
      ? 'Đăng nhập để mua hàng'
      : cartItemIndex >= 0
      ? isBuyOne
        ? 'Đã có trong giỏ'
        : 'Cập nhật giỏ hàng'
      : Languages.BUYNOW;

    return (
      <View style={[cartStyles.bottomView]}>
        <View
          style={[
            styles.buttonContainer,
            isBuyOne && { alignItems: 'center', justifyContent: 'center' },
          ]}>
          {isBuyOne ? null : (
            <View style={styles.quantitySelect}>
              <TouchableOpacity
                style={styles.minusLeft}
                onPress={this.onClickMinus}
                activeOpacity={0.7}>
                <UboIcon name="minus" size={16} />
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{quantity}</Text>
              <TouchableOpacity
                style={styles.plusRight}
                onPress={this.onClickPlus}
                activeOpacity={0.7}>
                <UboIcon name="plus" size={16} />
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.productPrice, isBuyOne && { width: 'auto' }]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.priceText]}>
                {`${productDetail.price >= 0 ? currencyFormatter(quantity * productDetail.price) : 'Hết hàng'}`}
              </Text>
              {productDetail.price >= 0 ? (
                <Text style={styles.priceSymbol}>{Constants.VND}</Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>

        <View style={cartStyles.buttonContainer}>
          <Button
            text={btnText.toUpperCase()}
            style={[cartStyles.button]}
            textStyle={cartStyles.buttonText}
            onPress={this._onAddToCart}
          />
        </View>
      </View>
    );
  };

  _renderSpecificationItem = item => {
    const { productDetail, onViewProductScreen } = this.props;
    if (!item.name) {
      return <View />;
    }
    const isActive = item.productCode === productDetail.code;
    const isOutOfStock = item.outOfStock;
    const productObj = {
      code: item.productCode,
      slug: item.productSlug,
      name: item.name,
      price: { outOfStock: item.outOfStock },
    };
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        key={item.productSlug}
        disabled={isActive}
        style={[
          styles.specificationItem,
          isOutOfStock ? styles.disabledSpecification : isActive && styles.activeSpecification,
        ]}
        onPress={() => {
          onViewProductScreen({ product: productObj });
        }}>
        <Text
          style={[
            styles.specificationText,
            isOutOfStock
              ? {
                  color: isActive ? Color.primary : Color.blackTextDisable,
                }
              : isActive && styles.activeSpecificationText,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderSpecifications = () => {
    const { productDetail } = this.props;
    if (
      !productDetail ||
      !productDetail.specifications ||
      !productDetail.specifications.length ||
      productDetail.specifications.length <= 1
    ) {
      return null;
    }

    const specifications = productDetail.specifications.sort((a, b) =>
      a.name > b.name ? 1 : a.name === b.name ? 0 : -1,
    );

    if (specifications.length >= 3) {
      return (
        <View style={styles.specifications}>
          {specifications.map(this._renderSpecificationItem)}
        </View>
      );
    }
    return (
      <View style={styles.specifications}>
        <FlatList
          contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
          keyExtractor={(item, index) => `specifications_${item.name}_${index}`}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          horizontal
          data={specifications}
          renderItem={({ item }) => this._renderSpecificationItem(item)}
        />
      </View>
    );
  };
  
  _renderTitle = () => {
    const { productDetail } = this.props;

    return (
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginTop: 6,
          marginBottom: 15,
        }}>
        <View style={styles.infoLeft}>
          <ProductTitle product={productDetail} />
          {productDetail && (
            <Text style={styles.productSubtext}>
              Còn {productDetail && productDetail.quantity ? productDetail.quantity : 0 } quyển
            </Text>
          )}
        </View>
        <View style={styles.infoRight}>
          <View style={styles.infoRightRow}>
            {productDetail && productDetail.publisher && productDetail.publisher.id ? (
              <Text style={styles.infoText} numberOfLines={1}>
                {productDetail.publisher.name}
              </Text>
            ) : null}
          </View>
          <View style={styles.infoRightRow}>
            <Text style={styles.infoText} numberOfLines={1}>
              {productDetail && productDetail.publishYear
                ? `Xuất bản năm ${productDetail.publishYear}`
                : 'Xuất bản năm'
              }
            </Text>
          </View>
          <View style={styles.infoRightRow}>
            <Text style={styles.infoText} numberOfLines={1}>
              { productDetail && productDetail.pageNumber
                ? `${productDetail.pageNumber} trang`
                : ''
              }
            </Text>
          </View>
        </View>
      </View>
    );
  }  

  render() {
    const { product, productDetail, isFetching, publisherDetail, booksRelate, reviewBooks } = this.props;
    // const priceObj = getProductPrice(productDetail);
    const onSale = productDetail && productDetail.price && productDetail.price.discountText;
    const isGiftProduct = checkGiftProduct(productDetail);

    return (
      <View style={[styles.container, { backgroundColor: Color.background }]}>
        <ScrollView
          ref={this.scrollViewRef}
          overScrollMode="never"
          style={styles.listContainer}
          scrollEventThrottle={16}
          // onScroll={event => {
          //   this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
          // }}
        >
          <View
            // key={`${productDetail.id}-info-wrapper`}
            style={[styles.productInfo, { backgroundColor: Color.background }]}
            onLayout={event => (this.productInfoHeight = event.nativeEvent.layout.height)}>
            <View style={{ height: Constants.Window.width * 0.75 }}>
              {this._renderImages()}
              {/* <ProductNewTag
                product={product}
                style={{
                  top: 20,
                  right: 30,
                  width: 47,
                  height: 47,
                  // borderRadius: 7,
                }}
                textStyle={{ fontSize: 17, fontWeight: '600' }}
              /> */}
              {isGiftProduct ? (
                <ProductGiftTag
                  product={product}
                  style={{
                    bottom: 33,
                    right: 30,
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 7,
                  }}
                  textStyle={{ fontSize: 16, fontWeight: '600' }}
                />
              ) : onSale ? (
                <ProductMeta
                  product={product}
                  style={{
                    bottom: 33,
                    right: 30,
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 7,
                  }}
                  textStyle={{ fontSize: 16, fontWeight: '600' }}
                />
              ) : null}
            </View>
            {this._renderTitle()}
          </View>
          {this._renderSpecifications()}

          <View style={styles.lineGray} />

          {this._renderTabView()}
          {/* {this._renderProductRelated(
            Languages.FrequentlyBoughtTogether,
            booksRelate,
          )} */}

          <View style={styles.lineGray} />

          {reviewBooks && reviewBooks.items && this._renderProductRating(
            'Đánh giá sách',
            reviewBooks.items,
            reviewBooks,
          )}

          <View style={styles.lineGray} />
          
          {booksRelate && booksRelate.items && booksRelate.items.length > 0 && this._renderProductRelated(
            Languages.ProductRelated,
            booksRelate.items,
          )}
        </ScrollView>

        {this._renderButtons()}
        {isFetching ? <Spinner mode="overlay" /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    // carts: state?.carts,
    wishListItems: state?.wishList?.wishListItems,
    productDetail: state.products.productDetail,
    booksRelate: state.products.booksRelate,
    reviewBooks: state.products.reviewBooks,
    // authorDetail: state.products.authorDetail,
    // publisherDetail: state.products.publisherDetail,
    // isFetching: state.products.isFetchingDetail,
    // requiredLogin: state.products.requiredLogin,
    // buyOne: state.products.buyOne,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require('../../redux/CartRedux');
  const ProductRedux = require('../../redux/ProductRedux');
  const UserRedux = require('../../redux/UserRedux');

  return {
    ...ownProps,
    ...stateProps,
    login: code => {
      dispatch(UserRedux.actions.login(code));
    },
    addToCart: (payload, meta) => {
      dispatch(CartRedux.actions.addToCart(payload, meta));
    },
    updateCartItem: (product, quantity) => {
      CartRedux.actions.updateCartItem(dispatch, product, quantity);
    },
    getBookDetail: productId => {
      dispatch(ProductRedux.actions.getBookDetail(productId));
    },
    getPublisherById: id => {
      dispatch(ProductRedux.actions.getPublisherById(id));
    },
    getAuthorById: id => {
      dispatch(ProductRedux.actions.getAuthorById(id));
    },
    fetchCategoriesById: payload => {
      dispatch(ProductRedux.actions.fetchCategoriesById(payload));
    },
    fetchBooksByCategory: payload => {
      dispatch(ProductRedux.actions.fetchBooksByCategory(payload));
    },
    getReviewsBook: orderNumber => {
      ProductRedux.actions.getReviewsBook(dispatch, orderNumber);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
)(Detail);
