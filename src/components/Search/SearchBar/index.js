import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Icons from '../../../common/Icons';
import Languages from '../../../common/Languages';
import Color from '../../../common/Color';

class SearchBar extends React.Component {
  render() {
    let {
      autoFocus,
      value,
      onChangeText,
      onSubmitEditing,
      // scrollY,
      onClear,
      onFilter,
      // isShowFilter,
      haveFilter,
    } = this.props;

    // const transformY = scrollY.interpolate({
    //   inputRange: [0, 50],
    //   outputRange: [50, 0],
    //   extrapolate: 'clamp',
    // });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            // transform: [{ translateY: transformY }],
          },
          { backgroundColor: Color.lineColor },
        ]}>
        <Icon name={Icons.Ionicons.Search} size={20} color={Color.Text} />
        <TextInput
          placeholder={Languages.SearchPlaceHolder}
          placeholderTextColor={Color.blackTextSecondary}
          style={[styles.input, { color: Color.Text }]}
          underlineColorAndroid="transparent"
          autoFocus={autoFocus}
          selectTextOnFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Animated.Image
              source={require('../../../images/ic_clear_search.png')}
              style={[styles.icon, { tintColor: Color.Text }]}
            />
          </TouchableOpacity>
        )}

        <Animated.View style={[styles.separator, { tintColor: Color.Text }]} />

        <TouchableOpacity onPress={onFilter}>
          <Animated.Image
            source={require('../../../images/ic_filter_search.png')}
            style={[styles.icon, { tintColor: haveFilter ? Color.primary : Color.Text }]}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default SearchBar;
