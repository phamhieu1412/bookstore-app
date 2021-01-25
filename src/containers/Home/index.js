import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import HorizonList from '../../components/HorizonList';
import Color from '../../common/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    marginTop: 0,
  },
});

class Home extends PureComponent {
  static propTypes = {
    onViewProductScreen: PropTypes.func,
    onShowAll: PropTypes.func,
    showCategoriesScreen: PropTypes.func,
  };

  render() {
    const {
      onViewProductScreen,
      showCategoriesScreen,
      onViewCategory,
      onShowAll,
      endReached,
    } = this.props;

    return (
      <View style={styles.container}>
        <HorizonList
          onShowAll={onShowAll}
          onViewProductScreen={onViewProductScreen}
          showCategoriesScreen={showCategoriesScreen}
          onViewCategory={onViewCategory}
          endReached={endReached}
        />
      </View>
    );
  }
}

export default Home;
