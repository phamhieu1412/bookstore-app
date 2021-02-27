import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { BackWithTitle, CartSearchIcons, Back } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Color from '../common/Color';
import Styles from '../common/Styles';
import Config from '../common/Config';
import Languages from '../common/Languages';
import ParallaxHeader from '../components/ParallaxHeader';
import BackWithTitleIcons from '../components/BackWithTitleIcons';
import CartIcons from '../components/CartIcons';
import NavigationBarIcon from '../components/NavigationBarIcon';
import Category from '../containers/Category';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCategorySlug: '',
      textColor: Color.background,
      statusBarStyle: 'light-content',
      endReached: false,
    };

    this.getListColors();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // const { route } = nextProps;
    // const { mainCategorySlug } = prevState;
    // const mainCategory = route.params && route.params.mainCategory ? route.params.mainCategory : undefined;

    // if (mainCategory.id !== mainCategorySlug) {
    //   if (!mainCategory.mobiBanner) {
    //     setBarStyle('dark-content');
    //     return {
    //       mainCategorySlug: mainCategory.id,
    //       statusBarStyle: 'dark-content',
    //       textColor: '#000000',
    //     };
    //   }

    //   setBarStyle('light-content');
    //   return {
    //     mainCategorySlug: mainCategory.id,
    //     statusBarStyle: 'light-content',
    //     textColor: '#ffffff',
    //   };
    // }

    return null;
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  getListColors = () => {
    const categoryConfigs = Config.categories;
    let listColors = [];
    Object.keys(categoryConfigs).forEach(code => {
      const item = categoryConfigs[code];
      if (code === 'allColors') {
        listColors = listColors.concat(item);
      } else if (item.color) {
        listColors.push(item.color);
      }
    });

    this.listColors = listColors;
  };

  componentDidMount() {
    const { fetchBooksByCategory, navigation } = this.props;

    navigation.setOptions({
      headerTitle: () => null,
    });

    this._navListener = navigation.addListener('focus', () => {
      const { statusBarStyle } = this.state;
      const { route } = this.props;
      const mainCategory = route.params && route.params.mainCategory ? route.params.mainCategory : undefined;
      fetchBooksByCategory({category: mainCategory.id});
      // const { selectedCategory } = this.props;
      if (!mainCategory.mobiBanner) {
        this.setState({ statusBarStyle: 'dark-content' });
        setBarStyle('dark-content');
      } else {
        setBarStyle(statusBarStyle);
      }
      setTranslucent(true);
      setBackgroundColor('transparent');
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  onViewCategoryScreen = category => {
    this.props.navigation.setParams({
      mainCategory: category,
    });
  };

  updateStatusBarStyle = newStyle => {
    setBarStyle(newStyle);
    setTranslucent(true);
    setBackgroundColor('transparent');

    let color;
    if (newStyle === 'light-content') {
      color = '#ffffff';
    } else {
      color = '#000000';
    }

    this.setState({ textColor: color, statusBarStyle: newStyle });
  };

  setEndReached = status => {
    this.setState({ endReached: status });
  };

  renderNavBar = () => {
    const { navigation, route } = this.props;
    const mainCategory = route.params && route.params.mainCategory ? route.params.mainCategory : undefined;
    const background = route.params && route.params.catColor ? route.params.catColor : Color.primary;

    return (
      <View style={Styles.customNavContainter} key="category-navbar">
        <View style={Styles.transparentStatusBar} />
        <View style={Styles.customNavBar}>
          <View>
            <BackWithTitleIcons
              navigation={navigation}
              title={mainCategory.name || Languages.Category}
              background={background}
              onPress={() => navigation.goBack(null)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <NavigationBarIcon
              icon="heart"
              numberColor={0}
              onPress={() => navigation.navigate('CartScreen')}
              color="black"
            />
            <NavigationBarIcon
              icon="cart"
              number={0}
              onPress={() => navigation.navigate('CartScreen')}
              color="black"
            />
          </View>
        </View>
      </View>
    );
  };

  renderContent = () => {
    const { navigate } = this.props.navigation;
    const { route } = this.props;
    const mainCategory = route.params && route.params.mainCategory ? route.params.mainCategory : undefined;
    return (
      <Category
        key="category-content"
        category={mainCategory}
        endReached={this.state.endReached}
        onViewProductScreen={item => {
          navigate('DetailScreen', item);
        }}
        onViewCategoryScreen={this.onViewCategoryScreen}
      />
    );
  };

  render() {
    const { route } = this.props;
    const mainCategory = route.params && route.params.mainCategory ? route.params.mainCategory : undefined;

    return (
      <View style={{ flex: 1 }}>
        <ParallaxHeader
          backgroundImage={
            mainCategory && mainCategory.mobiBanner ? { uri: mainCategory.mobiBanner } : undefined
          }
          onChangeStatusBarStyle={this.updateStatusBarStyle}
          setEndReached={this.setEndReached}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
        />
      </View>
    );
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const ProductRedux = require('../redux/ProductRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchBooksByCategory: payload => {
      dispatch(ProductRedux.actions.fetchBooksByCategory(payload));
    },
  };
}

export default connect(
  undefined,
  undefined,
  mergeProps,
)(CategoryScreen);
