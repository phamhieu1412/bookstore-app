import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Config from '../../common/Config';

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Color.background,
  },
  flatlist: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 0,
    marginBottom: 10,
  },
  item: {
    width: 80,
    height: 85,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  oval: {
    width: 44,
    height: 44,
    borderRadius: 44,
    marginBottom: 10,
    backgroundColor: Color.primary,
  },
  label: {
    fontSize: 13,
    color: '#000000',
    letterSpacing: 0,
    textAlign: 'center',
    lineHeight: 16,
    height: 40,
  },
  seperator: {
    flex: 1,
    height: 1,
    borderTopColor: Color.blackTextSecondary,
    borderTopWidth: 1,
    marginBottom: 20,
  },
});

class SubCategories extends PureComponent {
  constructor(props) {
    super(props);

    this.getListColors();
  }

  static propTypes = {
    title: PropTypes.string,
    onViewProductScreen: PropTypes.func,
    subCategories: PropTypes.array,
  };

  onRowClickHandle = category => this.props.onViewProductScreen({ category });

  getListColors = () => {
    const { parentCode } = this.props;
    const categoryConfigs = Config.categories;
    const key = parentCode.substring(0, 2);

    if (categoryConfigs[key]) {
      const palatte = categoryConfigs[key].palatte;

      this.listColors = categoryConfigs[key].palatte.concat(
        categoryConfigs.allColors.filter(color => !palatte.includes(color))
      );
    } else {
      this.listColors = categoryConfigs.allColors;
    }
  };

  getColor = itemIndex => {
    return this.listColors[itemIndex];
  };

  renderItem = ({ item, index }) => {
    const { onCategoryPress } = this.props;
    const catColor = item.color ? item.color : this.getColor(index);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={() => onCategoryPress(item)}>
        <View style={[styles.oval, { backgroundColor: catColor }]} />
        <Text style={styles.label} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { subCategories } = this.props;
    if (subCategories.length === 0) {
      return <View />;
    }
    return (
      <View style={styles.wrap}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          keyExtractor={(item, index) => `subCategory__${index}`}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          horizontal
          data={subCategories}
          renderItem={this.renderItem}
          // renderItem={({ item, index }) => (
          //   <View style={styles.item}>
          //     <View style={styles.oval} />
          //     <Text style={styles.label}>{item.name}</Text>
          //   </View>
          // )}
        />
        <View style={styles.seperator} />
      </View>
    );
  }
}

SubCategories.defaultProps = {
  subCategories: [],
};

export default SubCategories;
