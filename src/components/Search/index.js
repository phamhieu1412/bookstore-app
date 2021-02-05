import React, { PureComponent } from 'react';
import { Text, FlatList, View, Animated, Keyboard } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';

import { BlockTimer, log } from '../../Omni';
import styles from './styles';

import SearchBar from './SearchBar';
import Recents from './Recents';
// import { logEventSearched } from '../../api/eventLogger';
import Spinkit from '../Spinkit';
import ProductListItem from '../ProductListItem';
import Constants from '../../common/Constants';
import Languages from '../../common/Languages';
import Color from '../../common/Color';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.page = props.currentSearchPage;
    this.limit = Constants.pagingLimit;
    this.state = {
      text: '',
      isSubmit: false,
      loading: false,
      focus: true,
      scrollY: new Animated.Value(0),
      filter: {},
    };
  }

  scrollY = new Animated.Value(0);

  onBack = () => {
    this.setState({ text: '' });
    Keyboard.dismiss();
    this.props.onBack();
  };

  startNewSearch = async () => {
    const { list, fetchProductsByName } = this.props;
    const { text } = this.state;
    this.page = 1;
    this.setState({ loading: true, isSubmit: true });
    // eventLogger
    // logEventSearched(text);

    await fetchProductsByName(text, this.limit, this.page);
    if (typeof list !== 'undefined') {
      this.setState({ loading: false, filter: {} });
    }
  };

  onRowClickHandle = product => {
    BlockTimer.execute(() => {
      this.props.onViewProductScreen({ product });
    }, 500);
  };

  renderItem = ({ item }) => {
    return (
      <ProductListItem small product={item} onViewProduct={() => this.onRowClickHandle(item)} />
    );
  };

  nextPosts = () => {
    const { isSearchMore } = this.props;
    if (isSearchMore) {
      this.page += 1;
      if (Object.keys(this.state.filter).length > 0) {
        this.props.filterProducts(this.state.text, this.limit, this.page, this.state.filter);
      } else {
        this.props.fetchProductsByName(this.state.text, this.limit, this.page);
      }
    }
  };

  renderHeader = () => {
    return (
      <Recents
        histories={this.props.histories}
        searchText={this.state.text}
        onClear={this.props.clearSearchHistory}
        onSearch={this.onSearch}
      />
    );
  };
  renderResultList = () => {
    const { list, isFetching } = this.props;
    const { isSubmit } = this.state;

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY }}}],
      { useNativeDriver: true }
    );

    return list !== '' ? (
      <AnimatedFlatList
        keyExtractor={(item, index) => `${item.slug} || ${index}`}
        contentContainerStyle={styles.flatlist}
        data={list}
        scrollEventThrottle={16}
        numColumns={2}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        onEndReachedThreshold={0.3}
        onEndReached={this.nextPosts}
        {...{ onScroll }}
      />
    ) : (
      isSubmit && !isFetching && (
        <Text style={{ textAlign: 'center' }}>{Languages.NoResultError}</Text>
      )
    );
  };

  render() {
    const { showFilterBox, list, isFetching } = this.props;
    const { text, filter, focus, scrollY, loading } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: Color.background }]}>
        <SearchBar
          scrollY={scrollY}
          autoFocus={focus}
          value={text}
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={this.searchProduct}
          onClear={() => this.setState({ text: '', filter: {} })}
          onFilter={() => showFilterBox(this.onFilter, filter)}
          isShowFilter={text !== '' || list.length > 0}
          haveFilter={Object.keys(filter).length > 0}
        />

        {isFetching && loading ? <Spinkit /> : this.renderResultList()}
      </View>
      // <InstantSearch />
    );
  }

  searchProduct = () => {
    this.props.saveSearchHistory(this.state.text);
    this.startNewSearch();
  };

  onSearch = text => {
    this.setState({ text }, this.searchProduct);
  };

  onFilter = async (filter, page = 1) => {
    const { filterProducts, list } = this.props;
    this.page = page;
    this.setState({ loading: true, isSubmit: true, filter });
    await filterProducts(this.state.text, this.limit, this.page, filter);
    if (typeof list !== 'undefined') {
      this.setState({ loading: false });
    }
  };
}

Search.defaultProps = {
  histories: [],
  isSearchMore: false,
  currentSearchPage: 1,
};

const mapStateToProps = ({ products }) => ({
  list: products.productsByName,
  isFetching: products.isFetchingByName,
  histories: products.histories,
  isSearchMore: products.isSearchMore,
  currentSearchPage: products.currentSearchPage,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require('../../redux/ProductRedux');
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByName: (name, pageSize, page, filter = {}) => {
      const text = name ? name.trim() : '';
      if (text.length > 0) {
        actions.fetchProductsByName(dispatch, text, pageSize, page, filter);
      }
    },
    saveSearchHistory: searchText => {
      if (searchText.length > 0) {
        actions.saveSearchHistory(dispatch, searchText);
      }
    },
    clearSearchHistory: () => {
      actions.clearSearchHistory(dispatch);
    },
    filterProducts: (name, pageSize, page, filter = {}) => {
      const text = name ? name.trim() : '';
      actions.fetchProductsByName(dispatch, text, pageSize, page, filter);
    },
  };
};
module.exports = connect(
  mapStateToProps,
  null,
  mergeProps
)(Search);
