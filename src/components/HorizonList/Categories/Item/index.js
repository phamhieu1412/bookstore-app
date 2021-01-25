import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
// import { logEventCustom } from '../../../../api/eventLogger';
import Images from '../../../../common/Images';
import Color from '../../../../common/Color';
import Constants from '../../../../common/Constants';

class Item extends PureComponent {
  onClickCategoryBubble = () => {
    const { item, onPress } = this.props;
    const eventValues = {
      fb_content_id: item.slug === Constants.allCategorySlug ? 'all-categories' : item.code,
      fb_content_type: 'category',
    };
    // logEventCustom('fb_mobile_home_category_click', eventValues);
    onPress({ ...item });
  };
  render() {
    const { item } = this.props;
    const imageIcon = item.mobiIconSource
      ? item.mobiIconSource
      : item.mobiIcon
        ? { uri: item.mobiIcon }
        : Images.defaultCategoryIcon;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.wrap}
          onPress={this.onClickCategoryBubble}>
          <View style={styles.iconView}>
            {imageIcon ? <FastImage source={imageIcon} style={styles.imageIcon} /> : null}
          </View>
          <Text style={[styles.title, { color: Color.Text }]}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Item;
