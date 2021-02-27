import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import moment from 'moment';

import styles from './styles';
import Color from '../../common/Color';
import ProductSwiperItem from '../ProductSwiperItem';
import { Icon } from '../../Omni';

class ProductRating extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onViewProductScreen: PropTypes.func,
    reviews: PropTypes.array,
  };

  onRowClickHandle = product => this.props.onViewProductScreen({ product });

  _renderItemReview = (item) => {
    // const {} = this.props;
    
    return (
      <View style={[styles.viewReview, styles.line]}>
        <View style={{ marginHorizontal: 7 }}>
          <Image style={styles.avatarUserReview} source={require('../../images/default_avatar.png')} />
        </View>
        <View style={{ flex: 1 }}>
          <Text>{item.item.createdBy}</Text>
          <Rating
            ratingCount={5}
            imageSize={12}
            startingValue={item.item.rating}
            readonly={true}
            style={[styles.flexStart, { marginVertical: 5 }]}
          />
          <Text style={{ width: '95%', marginVertical: 5 }}>{item.item.content}</Text>
          <View style={{ flexWrap: 'wrap', marginBottom: 7, marginTop: 3 }}>
            <View style={styles.viewTitleRating}>
              <Text style={{ fontSize: 13, opacity: 0.6 }}>{item.item.title}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 13, opacity: 0.7 }}>
            {moment(item.item.createdAt * 1000).format('DD-MM-YYYY hh:mm')}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { title, reviews, reviewObj } = this.props;

    return (
      <View style={[styles.wrap, { backgroundColor: Color.background }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.head}>
            <Text style={[styles.headTitle, { color: Color.Text }]}>{title.toUpperCase()}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Rating
                ratingCount={5}
                imageSize={15}
                startingValue={reviewObj && reviewObj.averageRating ? reviewObj.averageRating : 0}
                readonly={true}
                style={[styles.flexStart]}
              />
              <Text style={{ marginLeft: 10, marginRight: 3, color: '#ff4700' }}>
                {reviewObj && reviewObj.averageRating ? reviewObj.averageRating : 0}/5
              </Text>
              <Text style={{ opacity: 0.7 }}>
                ({reviews.length} đánh giá)
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#ff4700' }}>Xem tất cả</Text>
            <Icon name="chevron-right" size={25} color="#ff4700"/>
          </View>
        </View>

        <View style={[styles.line, { marginVertical: 15 }]} />

        {
          reviews.length === 0 ? (
            <>
              <View style={styles.viewNoRating}>
                <Text style={{ opacity: 0.9 }}>Hiện chưa có đánh giá về sản phẩm</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.flatlist}>
                <FlatList
                  data={reviews}
                  keyExtractor={(item, index) => `review_${item.id}_${index}`}
                  renderItem={item => this._renderItemReview(item)}
                />
              </View>
              <View style={styles.buttonShowAllBottom}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#ff4700' }}>Xem Tất Cả ({reviews.length})</Text>
                  <Icon name="chevron-right" size={25} color="#ff4700"/>
                </View>
              </View>
            </>
          )
        }
      </View>
    );
  }
}

ProductRating.defaultProps = {
  reviews: [],
};

export default ProductRating;
