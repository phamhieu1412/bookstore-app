import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

class FormRatingStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexRating: 1,
    };
  }

  ratingCompleted = rating => {
    const { reviewOrder, getNumberRating } = this.props;
    getNumberRating(rating, reviewOrder.name);
  };

  render() {
    const { reviewOrder } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textFeedback}>{reviewOrder.name}</Text>

        <View style={styles.line} />

        <AirbnbRating
          count={3}
          reviews={['Không tốt', 'Bình thường', 'Tốt']}
          defaultRating={3}
          reviewSize={16}
          size={22}
          onFinishRating={this.ratingCompleted}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 5,
  },
  textFeedback: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  line: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginHorizontal: 20,
  },
});

export default FormRatingStar;
