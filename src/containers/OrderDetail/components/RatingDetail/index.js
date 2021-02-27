import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Image } from 'react-native';
// import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

import Button from '../../../../components/Button/Button';
import FormRatingStar from './FormRatingStar';
import ListRatingStar from './ListRatingStar';
import Constants from '../../../../common/Constants';
import Color from '../../../../common/Color';
import Languages from '../../../../common/Languages';
import { toast } from '../../../../Omni';

class RatingDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexSwiper: 0,
      indexRating: 1,
      listReviewOrders: [
        {
          key: 'Product',
          name: Languages.Product,
          score: 3,
        },
        {
          key: 'Delivery',
          name: Languages.DeliveryOrder,
          score: 3,
        },
        {
          key: 'Service',
          name: Languages.ServiceOrder,
          score: 3,
        },
      ],
      valueTextReview: '',
      countValueTextReview: 0,
      countValue: 5,
    };
  }

  onSwiperIndexChanged = index => {
    this.setState({ indexSwiper: index });

    return null;
  };

  getNumberRating = (value) => {
    this.setState({ countValue: value });
  };

  onPostReviewOrders = () => {
    const { countValue, valueTextReview } = this.state;
    const { order, navigation, postReviewOrders, items } = this.props;
    const listReviewTitle = ['Sách tệ', 'Sách không hay', 'Nội dung bình thường', 'Sách hay', 'Sách hay quá đi'];
    // for (let i = 0; i < items.length; i++) {
    //   const element = items[i].product.id;
    //   postReviewOrders({
    //     title: 'wow',
    //     rating: 1,
    //     content: valueTextReview,
    //     product_id: element,
    //   }, {
    //     onSuccess: () => {
    //       if (i + 1 === items.length) {
    //         toast('Đánh giá thành công!');
    //         navigation.goBack(null);
    //       }
    //     },
    //     onFailure: () => {
    //       toast(Languages.GetDataError);
    //     },
    //   });
    // }
    postReviewOrders({
      title: listReviewTitle[countValue - 1],
      rating: countValue,
      content: valueTextReview,
      product_id: items[0].product.id,
    }, {
      onSuccess: () => {
          toast('Đánh giá thành công!');
          navigation.goBack(null);
      },
      onFailure: () => {
        toast(Languages.GetDataError);
      },
    });
  };

  changeReview = text => {
    this.setState({ valueTextReview: text, countValueTextReview: text.length });
  };

  render() {
    const { listReviewOrders, valueTextReview, countValueTextReview } = this.state;
    const { reviewOrders, user, items } = this.props;
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Đánh giá đơn hàng và sản phẩm!</Text>
        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
          {
            items.map(item => (
              <View
                key={item.id}
                style={styles.item}
              >
                <Image style={styles.image} source={{ uri: item.product.images[0] }} />
                <Text>{item.product.title}</Text>
              </View>
            ))
          }
        </View>
        
        <>
          <FormRatingStar getNumberRating={this.getNumberRating} />
          
          <View style={styles.comment}>
            <TextInput
              style={styles.textFeedback}
              multiline
              numberOfLines={4}
              maxLength={200}
              placeholder="Chia sẻ đánh giá của bạn."
              onChangeText={text => this.changeReview(text)}
              value={valueTextReview}
            />
            <Text style={styles.textCharacter}>{`(${countValueTextReview}/200)`}</Text>

            <Button
              text={Languages.Review}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={this.onPostReviewOrders}
              // disabled={countValueTextReview === 0}
            />
          </View>
        </>
        {/* {reviewOrders.id ? (
          <>
            <ListRatingStar reviewOrders={reviewOrders} user={user} />
          </>
        ) : (
          
        )} */}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userProfile: user,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions: orderActions } = require('../../../../redux/OrderRedux');

  return {
    ...ownProps,
    ...stateProps,
    cancelOrderItem: (orderNumber, productCode) => {
      orderActions.cancelOrderItem(dispatch, orderNumber, productCode);
    },
    getOrderDetail: orderNumber => {
      orderActions.fetchOrderDetail(dispatch, orderNumber);
    },
    postReviewOrders: (reviewInfo, meta) => {
      orderActions.postReviewOrders(dispatch, reviewInfo, meta);
    },
    getReviewOrders: orderNumber => {
      orderActions.getReviewOrders(dispatch, orderNumber);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(RatingDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
    fontWeight: '600',
    marginVertical: 10,
  },
  comment: {
    // flex: 1,
  },
  textFeedback: {
    position: 'relative',
    height: (Dimensions.get('window').height * 12) / 100,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e2e8f0',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 85,
  },
  button: {
    position: 'absolute',
    width: (Dimensions.get('window').width * 4) / 10,
    left: (Dimensions.get('window').width * 3) / 10,
    bottom: -3,
    borderRadius: 20,
    paddingVertical: 3,
    // paddingHorizontal: 20,
    backgroundColor: '#FF0025',
  },
  // buttonDisabled: {
  //   backgroundColor: Color.product.Discount,
  // },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Constants.fontHeader,
  },
  textCharacter: {
    fontSize: 11,
    color: '#88888a',
    position: 'absolute',
    right: 30,
    bottom: 15,
  },
  image: {
    width: 54,
    height: 36,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0, 0.2)',
    paddingBottom: 10,
  }
});
