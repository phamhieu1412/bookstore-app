import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Slider from 'react-native-fluid-slider';

import {currencyFormatter} from '../../ultils/Product';
import styles from './styles';
import Languages from '../../common/Languages';
import Constants from '../../common/Constants';
import Color from '../../common/Color';
import ProductCatalog from '../../components/ProductCatalog';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.filter = {};
    this.state = {
      // scrollY: new Animated.Value(0),
      // expanded: true,
      category: '',
      maxPrice: Constants.Filter.defaultPrice,
      previousParams: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {route} = nextProps;
    const values = route.params;
    const {previousParams} = prevState;
    let newState = null;
    if (values) {
      if (values.category && values.category !== previousParams.category) {
        newState = {category: values.category};
        newState.previousParams = values;
      }
      if (values.maxPrice && values.maxPrice !== previousParams.maxPrice) {
        newState = newState
          ? Object.assign(newState, {maxPrice: values.maxPrice})
          : {maxPrice: values.maxPrice};
        newState.previousParams = values;
      }
    }

    return newState;
  }

  render() {
    const {categories, list} = this.props;
    const {category, maxPrice} = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <ProductCatalog
            categories={categories}
            selected={category}
            onSelectCategory={this.onSelectCategory}
          />

          <Text style={styles.pricing}>{Languages.Pricing}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{currencyFormatter(0)}</Text>
            <Text style={styles.value}>
              {currencyFormatter(this.state.maxPrice)}
            </Text>
            <Text style={styles.label}>
              {currencyFormatter(Constants.Filter.maxPrice)}
            </Text>
          </View>
          <View style={styles.slideWrap}>
            <Slider
              value={maxPrice}
              onValueChange={this.onValueChange}
              onSlidingComplete={() => {}}
              minimumTrackTintColor="#FF0025"
              maximumTrackTintColor="#bdc2cc"
              thumbTintColor="#FF0025"
              minimumValue={Constants.Filter.minPrice}
              step={Constants.Filter.priceStep}
              maximumValue={Constants.Filter.maxPrice}
            />
          </View>

          <TouchableOpacity style={styles.btnFilter} onPress={this.onFilter}>
            <Text style={styles.filterText}>{Languages.Filter}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnClear} onPress={this.clearFilter}>
            <Text style={styles.clearFilter}>{Languages.ClearFilter}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  onSelectCategory = (item) => {
    this.setState({category: item});
    this.filter = {...this.filter, category: item};
  };

  // onSelectTag = (item) => {
  //   this.filter = { ...this.filter, tag: item.id };
  // };

  onValueChange = (maxPrice) => {
    this.setState({maxPrice});
    this.filter = {...this.filter, maxPrice};
  };

  onFilter = () => {
    // this.props.filterProducts('', 16, 1, this.filter);
    // // this.props.route.params.onSearch(this.filter);
    this.props.onBack();
    this.props.searchBooksByPrice({
      max_price: this.filter.maxPrice,
      category: this.filter.category.id,
    });
  };

  clearFilter = () => {
    this.props.filterProducts('', 16, 1, {});
    // this.props.route.params.onSearch({});
    this.props.onBack();
  };

  // componentDidMount() {
  //   this.props.fetchTags();
  // }
}

// Filters.defaultProps = {
//   tags: [],
// };

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
    list: state.products.booksByPrice,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {netInfo} = stateProps;
  const {dispatch} = dispatchProps;
  const {actions} = require('../../redux/ProductRedux');

  return {
    ...ownProps,
    ...stateProps,
    searchBooksByPrice: (payload) => {
      dispatch(actions.searchBooksByPrice(payload));
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(Filters);
