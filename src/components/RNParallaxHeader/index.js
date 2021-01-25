import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, Animated, View, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

import Constants from '../../common/Constants';
import styles from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
// const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = 'white';
const DEFAULT_BACKGROUND_COLOR = 'white';

class RNParallaxHeader extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      scrolledPassImage: false,
      currentImageIndex: 0,
    };
  }

  onScrollEvent = ({ nativeEvent }) => {
    const {
      backgroundImage,
      onChangeStatusBarStyle,
      endReachedThreshold,
      setEndReached,
    } = this.props;
    const { scrolledPassImage } = this.state;
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    if (backgroundImage) {
      const { colorBlack } = this.state;
      if (contentOffset.y !== 0) {
        if (!scrolledPassImage) {
          this.setState({ scrolledPassImage: true });
        }
      } else {
        if (scrolledPassImage) {
          this.setState({ scrolledPassImage: false });
        }
      }
      if (contentOffset.y > 45) {
        if (!colorBlack) {
          onChangeStatusBarStyle('dark-content');
          this.setState({
            colorBlack: true,
          });
        }
      } else {
        if (colorBlack) {
          onChangeStatusBarStyle('light-content');
          this.setState({
            colorBlack: false,
          });
        }
      }
    }

    // is end reached
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - endReachedThreshold;
    if (isEndReached) {
      setEndReached(true);
    } else {
      setEndReached(false);
    }
  };

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight(),
      ],
      extrapolate: 'clamp',
    });
  }

  getNavBarOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getNavBarForegroundOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowNavBar } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    });
  }

  getImageOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  getImageTranslate() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
  }

  getImageScale() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslateY() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: 'clamp',
    });
  }

  getTitleOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getTitleColor() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance()],
      outputRange: ['#ffffff', '#333333'],
    });
  }

  onSwiperIndexChanged = index => {
    this.setState({ currentImageIndex: index });

    return null;
  };

  renderBackgroundImage() {
    const { backgroundImage, onPressImage, autoPlayImage } = this.props;
    const { scrolledPassImage, currentImageIndex } = this.state;
    const autoPlay = autoPlayImage && !scrolledPassImage;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();
    const bgImage = Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];

    return bgImage.length > 1 && !scrolledPassImage ? (
      <Swiper
        key={`home-slider-${bgImage.length}-${currentImageIndex}`}
        width={Constants.Window.width}
        height={this.getHeaderMaxHeight()}
        loadMinimal
        autoplay={autoPlay}
        autoplayTimeout={5}
        showsPagination
        removeClippedSubviews={false}
        paginationStyle={{ zIndex: 9999, bottom: 0 }}
        activeDotStyle={styles.dotActive}
        dotStyle={styles.dot}
        index={currentImageIndex}
        onIndexChanged={this.onSwiperIndexChanged}
        loop>
        {bgImage.map((item, index) =>
          onPressImage ? (
            <TouchableOpacity
              activeOpacity={0.9}
              key={item.uri}
              onPress={() => onPressImage(index)}>
              <Animated.Image
                style={[
                  styles.bgImage,
                  {
                    height: this.getHeaderMaxHeight(),
                    opacity: imageOpacity,
                    transform: [{ translateY: imageTranslate }, { scale: imageScale }],
                  },
                ]}
                source={item}
              />
            </TouchableOpacity>
          ) : (
              <Animated.Image
                style={[
                  styles.bgImage,
                  {
                    height: this.getHeaderMaxHeight(),
                    opacity: imageOpacity,
                    transform: [{ translateY: imageTranslate }, { scale: imageScale }],
                  },
                ]}
                source={item}
              />
            )
        )}
      </Swiper>
    ) : (
        <Animated.Image
          style={[
            styles.bgImage,
            {
              height: this.getHeaderMaxHeight(),
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslate }, { scale: imageScale }],
            },
          ]}
          source={bgImage[currentImageIndex]}
        />
      );
  }

  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
      />
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}>
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }

  renderHeaderTitle() {
    if (!title) {
      return <View />;
    }

    const { title, titleStyle, headerTitleStyle } = this.props;
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();
    const titleColor = this.getTitleColor();

    const titleAnimationStyle = { color: titleColor };
    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [{ translateY: titleTranslateY }],
            height: this.getHeaderHeight(),
            opacity: titleOpacity,
            color: titleColor,
          },
          headerTitleStyle,
        ]}>
        {typeof title === 'string' && (
          <Animated.Text style={[styles.headerText, titleStyle, titleAnimationStyle]}>
            {title}
          </Animated.Text>
        )}
        {typeof title !== 'string' && title}
      </Animated.View>
    );
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity,
          },
        ]}>
        {renderNavBar()}
      </Animated.View>
    );
  }

  renderScrollView() {
    const {
      renderContent,
      scrollEventThrottle,
      scrollViewStyle,
      contentContainerStyle,
      innerContainerStyle,
      scrollViewProps,
    } = this.props;
    const { scrollY } = this.state;
    return (
      <Animated.ScrollView
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            listener: event => this.onScrollEvent(event),
            useNativeDriver: false
          }, // Optional async listener
        )}
        {...scrollViewProps}>
        <Animated.View style={[{ marginTop: this.getHeaderMaxHeight() }, innerContainerStyle]}>
          {renderContent()}
        </Animated.View>
      </Animated.ScrollView>
    );
  }

  render() {
    const { containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderScrollView()}
        {this.renderNavbarBackground()}
        {this.renderHeaderBackground()}
        {this.renderHeaderTitle()}
        {this.renderHeaderForeground()}
      </View>
    );
  }
}

RNParallaxHeader.propTypes = {
  renderNavBar: PropTypes.func,
  renderContent: PropTypes.func,
  onChangeStatusBarStyle: PropTypes.func,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.any,
  onPressImage: PropTypes.func,
  navbarColor: PropTypes.string,
  title: PropTypes.any,
  titleStyle: PropTypes.any,
  headerTitleStyle: PropTypes.any,
  headerMaxHeight: PropTypes.number,
  headerMinHeight: PropTypes.number,
  scrollEventThrottle: PropTypes.number,
  extraScrollHeight: PropTypes.number,
  backgroundImageScale: PropTypes.number,
  contentContainerStyle: PropTypes.any,
  innerContainerStyle: PropTypes.any,
  scrollViewStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  alwaysShowTitle: PropTypes.bool,
  alwaysShowNavBar: PropTypes.bool,
  statusBarColor: PropTypes.string,
  scrollViewProps: PropTypes.object,
  endReachedThreshold: PropTypes.number,
  setEndReached: PropTypes.func,
};

RNParallaxHeader.defaultProps = {
  renderNavBar: () => <View />,
  renderContent: () => { },
  onChangeStatusBarStyle: () => { },
  navbarColor: DEFAULT_NAVBAR_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  backgroundImage: null,
  onPressImage: null,
  title: null,
  titleStyle: styles.headerText,
  headerTitleStyle: null,
  headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
  headerMinHeight: DEFAULT_HEADER_MIN_HEIGHT,
  scrollEventThrottle: SCROLL_EVENT_THROTTLE,
  extraScrollHeight: DEFAULT_EXTRA_SCROLL_HEIGHT,
  backgroundImageScale: DEFAULT_BACKGROUND_IMAGE_SCALE,
  contentContainerStyle: null,
  innerContainerStyle: null,
  scrollViewStyle: null,
  containerStyle: null,
  alwaysShowTitle: true,
  alwaysShowNavBar: true,
  statusBarColor: null,
  scrollViewProps: {},
  endReachedThreshold: 1800,
  setEndReached: () => { },
};

export default RNParallaxHeader;
