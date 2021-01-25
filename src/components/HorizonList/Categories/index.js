import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';

import Item from './Item/index';
import Styles from '../../../common/Styles';
import Images from '../../../common/Images';
import Languages from '../../../common/Languages';
import Color from '../../../common/Color';
import Constants from '../../../common/Constants';

class Categories extends PureComponent {
  static defaultProps = {
    categories: [],
  };

  onCategoryPress = cat => {
    const { showCategoriesScreen, onPress } = this.props;
    if (cat.slug === Constants.allCategorySlug) {
      showCategoriesScreen();
    } else {
      onPress(cat);
    }
  };

  render() {
    const { categories, type } = this.props;
    let topCategories = [];
    if (categories.length) {
      topCategories = categories.slice(0, 7);
      topCategories.push({
        mobiIconSource: Images.viewAllCategories,
        name: Languages.seeMore,
        slug: Constants.allCategorySlug,
      });
    }

    return categories.length ? (
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={[Styles.Common.flatlist]}
        style={{
          paddingBottom: 30,
          paddingLeft: 13,
          paddingRight: 12,
          backgroundColor: Color.sectionBackground,
        }}
        showsHorizontalScrollIndicator={false}
        // horizontal={column === 1}
        numColumns={4}
        data={topCategories}
        renderItem={({ item }) => <Item item={item} type={type} onPress={this.onCategoryPress} />}
      />
    ) : (
      <View />
    );
  }
}

export default Categories;
