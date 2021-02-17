import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Color from '../../common/Color';
import Empty from '../../components/Empty';
import LogoSpinner from '../../components/LogoSpinner';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const categoryLinearGradient = [
  {
    gradient: ['#E3CE33', '#E5D3E3'],
  },
  {
    gradient: ['#322F20', '#6A5837'],
  },
  {
    gradient: ['#982649', '#FE5F00'],
  },
  {
    gradient: ['#ABEDC6', '#98D9C2'],
  },
  {
    gradient: ['#7D7E75', '#B0B2B8'],
  },
  {
    gradient: ['#C08497', '#F7AF9D'],
  },
  {
    gradient: ['#F59B23', '#C2F8CB'],
  },
  {
    gradient: ['#FCA17D', '#F9DBBD'],
  },
  {
    gradient: ['#654597', '#E2ADF2'],
  },
  {
    gradient: ['#BFD1E5', '#D8BFAA'],
  },
  {
    gradient: ['#D2F898', '#F6F930'],
  },
];

class CategoriesScreen extends React.PureComponent {
  state = {
    scrollY: new Animated.Value(0),
  };

  componentDidMount() {
    const {fetchCategories} = this.props;
    fetchCategories();
  }

  onRowClickHandle = (category, color) => {
    const {onViewCategory} = this.props;
    onViewCategory({mainCategory: category, catColor: color});
    // BlockTimer.execute(() => {
    //   // setSelectedCategory({
    //   //   ...category,
    //   //   mainCategory: category,
    //   // });
    //   onViewCategory({ mainCategory: category });
    // }, 500);
  };

  renderItem = ({item, index}) => {
    const listColors = this.listColors;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.categoryContainer]}
        key={item.slug}
        onPress={() => this.onRowClickHandle(item, categoryLinearGradient[index].gradient[0])}>
        <View
          style={{
            width: '100%',
            height: 40,
            marginTop: 10,
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 1.5}}
              colors={categoryLinearGradient[index].gradient}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
              <Text style={styles.titleText} numberOfLines={2}>
                {item.name}
              </Text>
            </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {categories, fetchCategories} = this.props;

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
          keyExtractor={(item, index) => `${item.id} || ${index}`}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: Platform.OS !== 'android'},
          )}
          data={mainCategories}
          refreshing={categories.isFetching}
          refreshControl={
            <RefreshControl
              refreshing={categories.isFetching}
              onRefresh={() => fetchCategories()}
            />
          }
          numColumns={1}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    netInfo: state.netInfo,
    user: state.user,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {netInfo} = stateProps;
  const {dispatch} = dispatchProps;
  const {actions} = require('../../redux/CategoryRedux');
  // const { actions: NetInfoActions } = require('@redux/NetInfoRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => actions.fetchCategories(dispatch),
    // setActiveLayout: value => dispatch(actions.setActiveLayout(value)),
    // setSelectedCategory: category => dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
)(CategoriesScreen);
