import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import { toast } from '@app/Omni';
import styles from './styles';
import Color from '../../common/Color';
import Empty from '../../components/Empty';
import LogoSpinner from '../../components/LogoSpinner';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class CategoriesScreen extends React.PureComponent {
  state = {
    scrollY: new Animated.Value(0),
  };

  componentDidMount() {
    // const { fetchCategories } = this.props;
    // fetchCategories();
  }

  onRowClickHandle = (category, color) => {
    const { onViewCategory } = this.props;
    onViewCategory({ mainCategory: category, catColor: color });
    // BlockTimer.execute(() => {
    //   // setSelectedCategory({
    //   //   ...category,
    //   //   mainCategory: category,
    //   // });
    //   onViewCategory({ mainCategory: category });
    // }, 500);
  };

  renderItem = ({ item, index }) => {
    const listColors = this.listColors;
    const imageCategory = item.mobiThumbnail ? { uri: item.mobiThumbnail } : false;
    const catColor = item.color
      ? item.color
      : listColors && listColors.length
      ? listColors[index % listColors.length]
      : Color.primary;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.categoryContainer]}
        key={item.slug}
        onPress={() => this.onRowClickHandle(item, catColor)}>
        <View style={styles.imageContainer}>
          {imageCategory ? (
            <Image source={imageCategory} style={styles.categoryImage} />
          ) : (
            <View style={[styles.categoryImage, styles.placeholder]}>
              <Text style={styles.placeholderText}>Ubofood</Text>
            </View>
          )}
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.titleText} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
        {/* <LinearGradient colors={['transparent', '#0d1c33']} style={styles.titleWrapper}>
          <Text style={styles.titleText} numberOfLines={2}>
            {item.name}
          </Text>
        </LinearGradient> */}
      </TouchableOpacity>
    );
  };

  render() {
    const { categories, fetchCategories } = this.props;

    if (categories.error) {
      return <Empty text={categories.error} />;
    }

    if (categories.isFetching) {
      return <LogoSpinner fullStretch />;
    }

    // const mainCategories = categories.list.filter(
    //   (category) => category.parent === 0
    // );
    const mainCategories = categories.list;

    return (
      <View style={styles.listView}>
        <AnimatedFlatList
          scrollEventThrottle={16}
          contentContainerStyle={styles.flatlist}
          keyExtractor={(item, index) => `${item.slug} || ${index}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: Platform.OS !== 'android' }
          )}
          data={mainCategories}
          refreshing={categories.isFetching}
          refreshControl={
            <RefreshControl
              refreshing={categories.isFetching}
              // onRefresh={() => fetchCategories()}
            />
          }
          numColumns={3}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    netInfo: state.netInfo,
    user: state.user,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  // const { actions } = require('@redux/CategoryRedux');
  // const { actions: NetInfoActions } = require('@redux/NetInfoRedux');

  return {
    ...ownProps,
    ...stateProps,
    // fetchCategories: () => {
    //   if (!netInfo.isConnected) {
    //     NetInfoActions.renewConnectionStatus(dispatch);
    //   } else {
    //     actions.fetchCategories(dispatch);
    //   }
    // },
    // setActiveLayout: value => dispatch(actions.setActiveLayout(value)),
    // setSelectedCategory: category => dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(CategoriesScreen);
