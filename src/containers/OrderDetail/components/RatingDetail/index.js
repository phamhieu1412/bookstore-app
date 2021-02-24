import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
// import Swiper from 'react-native-swiper';

import Button from '../../../../components/Button/Button';
import FormRatingStar from './FormRatingStar';
import ListRatingStar from './ListRatingStar';
import Constants from '../../../../common/Constants';
import Color from '../../../../common/Color';
import Languages from '../../../../common/Languages';

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
    };
  }

  onSwiperIndexChanged = index => {
    this.setState({ indexSwiper: index });

    return null;
  };

  getNumberRating = (value, name) => {
    const { listReviewOrders } = this.state;
    const listReviewOrdersTemp = [...listReviewOrders];

    for (let i = 0; i < listReviewOrdersTemp.length; i++) {
      if (listReviewOrdersTemp[i].name === name) {
        listReviewOrdersTemp[i].score = value;
      }
    }

    this.setState({ listReviewOrders: listReviewOrdersTemp });
  };

  onPostReviewOrders = () => {
    const { listReviewOrders, valueTextReview } = this.state;
    const { order } = this.props;
    this.props.postReviewOrders({
      Comment: valueTextReview,
      DeliveryScore: listReviewOrders[1].score === 1 ? 1 : (listReviewOrders[1].score === 2 ? 3 : 5),
      Image: '',
      OrderCode: order.orderNumber,
      ProductScore: listReviewOrders[0].score === 1 ? 1 : (listReviewOrders[0].score === 2 ? 3 : 5),
      ServiceScore: listReviewOrders[2].score === 1 ? 1 : (listReviewOrders[2].score === 2 ? 3 : 5),
    })
  };

  changeReview = text => {
    this.setState({ valueTextReview: text, countValueTextReview: text.length });
  };

  render() {
    const { listReviewOrders, valueTextReview, countValueTextReview } = this.state;
    const { reviewOrders, user } = this.props;
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Đánh giá đơn hàng và sản phẩm!</Text>

        {reviewOrders.id ? (
          <>
            <ListRatingStar reviewOrders={reviewOrders} user={user} />
          </>
        ) : (
          <>
            {listReviewOrders.map(item => (
              <FormRatingStar
                key={item.key}
                reviewOrder={item}
                getNumberRating={this.getNumberRating}
              />
            ))}

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
        )}
      </View>
    );
  }
}

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
    flex: 1,
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
    width: (Dimensions.get('window').width * 2) / 10,
    left: (Dimensions.get('window').width * 4) / 10,
    bottom: -3,
    borderRadius: 20,
    paddingVertical: 3,
    // paddingHorizontal: 20,
    backgroundColor: Color.secondary,
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
});

export default RatingDetail;
