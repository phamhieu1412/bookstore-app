import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { find } from 'lodash';

import styles from './styles';
import Categories from './Categories';
import HHeader from './HHeader';
import HFooter from './HFooter';
import ProductListItem from '../ProductListItem';
import Constants from '../../common/Constants';
import Styles from '../../common/Styles';

class HorizonList extends PureComponent {
  static propTypes = {
    config: PropTypes.object,
    index: PropTypes.number,
    fetchPost: PropTypes.func,
    onShowAll: PropTypes.func,
    categoryList: PropTypes.array,
    isLast: PropTypes.bool,
    fetchProductsByCollections: PropTypes.func,
    setSelectedCategory: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    showCategoriesScreen: PropTypes.func,
    collection: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.defaultList = [];
  }

  // _dataType = () => {
  //   const { config } = this.props;
  //   if (config.predefined) return 'predefined';
  //   if (config.category) return 'category';
  //   // if (config.tag) return 'tag'; // don't have tag for now
  //   // if (config.banner) return 'banner';
  // };

  _title = () => {
    const { config, categoryList } = this.props;
    if (config.title) return config.title;
    if (config.predefined === 'category') {
      const mainCategory = find(categoryList, category => category.code === config.code);
      return mainCategory ? mainCategory.name : '';
    }

    return '';
  };

  /**
   * handle load more
   */
  _nextPosts = () => {
    const { config, index, fetchPost, collection } = this.props;
    this.page += 1;
    if (!collection.finish) {
      fetchPost({ config, index, page: this.page });
    }
  };

  _viewAll = () => {
    const { config, onShowAll, index, fetchProductsByCollections } = this.props;
    const { predefined } = config;
    if (predefined !== 'category') {
      fetchProductsByCollections(config, 1, index);
    }

    onShowAll(config, index);
  };

  onViewCategoryScreen = category => {
    const { onViewCategory } = this.props;
    onViewCategory({ mainCategory: category });
  };

  onViewProductScreen = product => {
    this.props.onViewProductScreen({ product });
  };

  renderItem = ({ item, index }) => {
    if (item === null) return <View key="product_" />;

    return (
      <ProductListItem
        product={item}
        key={`product-${index}-${item.slug}`}
        onViewProduct={() => this.onViewProductScreen(item)}
      />
    );
  };

  renderHeader = title => {
    if (!title) return <View />;

    const { config, collection } = this.props;
    const maxCount = config.maxCount || 4;

    const list = typeof collection !== 'undefined' ? collection.list : this.defaultList;

    return (
      <HHeader
        config={Object.assign({}, config, { name: title })}
        viewAll={list.length > maxCount ? this._viewAll : null}
      />
    );
  };

  renderSeperator = () => {
    return <View style={{ height: 9, backgroundColor: '#F0F0F0' }} />;
  };

  renderFooter = () => {
    const { showCategoriesScreen, collection, config } = this.props;
    const maxCount = config.maxCount || 4;

    const list = typeof collection !== 'undefined' ? collection.list : this.defaultList;

    if (list.length > maxCount) {
      return (
        <HFooter
          showCategoriesScreen={showCategoriesScreen}
          config={Object.assign({}, config)}
          viewAll={this._viewAll}
        />
      );
    }

    return null;
  };

  render() {
    const {
      onViewProductScreen,
      collection,
      config,
      index,
      categoryList,
      showCategoriesScreen,
      isLast,
      // endReached,
    } = this.props;

    const list = typeof collection !== 'undefined' ? collection.list : this.defaultList;

    if (config.predefined === Constants.Layout.categoryBubbles) {
      return categoryList.length ? (
        <View
          style={[
            styles.flatWrap,
            config.color && {
              backgroundColor: config.color,
            },
          ]}>
          <View style={Styles.Common.shadowBottom}>
            <Categories
              config={config}
              categories={categoryList}
              type={config.theme}
              onPress={this.onViewCategoryScreen}
              showCategoriesScreen={showCategoriesScreen}
            />
          </View>
          {this.renderSeperator()}
        </View>
      ) : (
        <View />
      );
    }

    const title = this._title();
    const maxCount = config.maxCount || 4;

    return list && list.length ? (
      <View
        style={[
          styles.flatWrap,
          config.color && {
            backgroundColor: config.color,
          },
        ]}>
        <View style={!isLast && Styles.Common.shadowBottom}>
          <FlatList
            listKey={index}
            contentContainerStyle={Styles.Common.listContainer}
            style={[Styles.Common.columnFlatlist, !isLast && { paddingBottom: 10 }]}
            data={list.slice(0, maxCount)}
            keyExtractor={(item, itemIndex) => `post__${itemIndex}`}
            renderItem={this.renderItem}
            scrollEventThrottle={16}
            numColumns={2}
            ListHeaderComponent={() => this.renderHeader(title)}
            // ListFooterComponent={this.renderFooter}
            overScrollMode="never"
            pagingEnabled={false}
            onEndReached={false}
          />
        </View>
        {!isLast && this.renderSeperator()}
      </View>
    ) : null;
  }
}

export default HorizonList;
