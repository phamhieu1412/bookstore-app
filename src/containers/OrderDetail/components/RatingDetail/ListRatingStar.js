import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import moment from 'moment';

import Languages from '../../../../common/Languages';

class ListRatingStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { reviewOrders, user } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.itemRatingStar}>
          <View style={styles.headerRating}>
            <Text style={styles.userName}>{user.user.name}</Text>
            {/* <Text style={styles.createAt}>{moment(item.createdAt).format("hh:mm DD/MM/YYYY")}</Text> */}
            <Text style={styles.createAt}>
              {moment(moment(reviewOrders.createdAt).subtract(15, 'hours')).format(
                'hh:mm DD/MM/YYYY'
              )}
            </Text>
          </View>

          <View style={styles.bodyRating}>
            <View style={styles.rating}>
              <Text style={styles.text}>{Languages.Product}</Text>

              <AirbnbRating
                count={3}
                reviews={['Không tốt', 'Bình thường', 'Tốt']}
                defaultRating={reviewOrders.productScore === 1 ? 1 : (reviewOrders.productScore === 3 ? 2 : 3)}
                size={20}
                isDisabled
                showRating={false}
              />
            </View>
            <View style={styles.rating}>
              <Text style={styles.text}>{Languages.DeliveryOrder}</Text>

              <AirbnbRating
                count={3}
                reviews={['Không tốt', 'Bình thường', 'Tốt']}
                defaultRating={reviewOrders.deliveryScore === 1 ? 1 : (reviewOrders.deliveryScore === 3 ? 2 : 3)}
                reviewSize={16}
                size={20}
                isDisabled
                showRating={false}
              />
            </View>
            <View style={styles.rating}>
              <Text style={styles.text}>{Languages.ServiceOrder}</Text>

              <AirbnbRating
                count={3}
                reviews={['Không tốt', 'Bình thường', 'Tốt']}
                defaultRating={reviewOrders.serviceScore  === 1 ? 1 : (reviewOrders.ServiceOrder === 3 ? 2 : 3)}
                reviewSize={16}
                size={20}
                isDisabled
                showRating={false}
              />
            </View>
          </View>

            {
              reviewOrders.comment && reviewOrders.comment !== '' ?
                <View>
                  <Text style={styles.textFeedback}>{reviewOrders.comment}</Text>
                </View> :
                <Text style={{height: 0}}/>
            }

            {
              reviewOrders.adminReply && reviewOrders.adminReply !== '' ?
                <View style={styles.responseReivew}>
                  <Text style={{ fontWeight: 'bold' }}>Phản hồi từ Quản trị viên:</Text>
                  <Text style={{ opacity: 0.7, marginTop: 5 }}>{reviewOrders.adminReply}</Text>
                </View> :
                <Text style={{height: 0}}/>
            }

          <View style={styles.line} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  itemRatingStar: {
    width: '80%',
  },
  headerRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  createAt: {
    opacity: 0.7,
  },
  bodyRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 0,
  },
  rating: {
    position: 'relative',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'gray',
  },
  text: {
    position: 'absolute',
    fontSize: 13,
    flexWrap: 'wrap',
    zIndex: 2,
    top: Platform.OS === 'ios' ? -9 : -10,
    backgroundColor: 'white',
  },
  textFeedback: {
    marginTop: 15
  },
  line: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
  },
  responseReivew: {
    backgroundColor: '#e2e8f0',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default ListRatingStar;
