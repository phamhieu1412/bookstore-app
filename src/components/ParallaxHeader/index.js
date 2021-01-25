import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import RNParallaxHeader from '../RNParallaxHeader/index';
import Styles from '../../common/Styles';
import Device from '../../common/Device';
import Color from '../../common/Color';

class ParallaxHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { textColor: Color.background };
  }

  render() {
    const {
      renderNavBar,
      renderContent,
      backgroundImage,
      onPressImage,
      // backgroundColor,
      autoPlayImage,
      headerMaxHeight,
      onChangeStatusBarStyle,
      setEndReached,
    } = this.props;
    const headerHeight =
      Styles.headerHeight + Styles.statusBar.height + (Device.isIphoneX ? 20 : 25);

    return (
      <View style={styles.container}>
        <RNParallaxHeader
          headerMinHeight={headerHeight}
          headerMaxHeight={backgroundImage ? headerMaxHeight || 200 : headerHeight}
          extraScrollHeight={100}
          navbarColor={Color.background}
          title="BookStore"
          // title="BookStore"
          // titleStyle={styles.titleStyle}
          backgroundImage={backgroundImage}
          onPressImage={onPressImage}
          autoPlayImage={autoPlayImage}
          // backgroundColor={backgroundColor}
          backgroundImageScale={1.2}
          onChangeStatusBarStyle={onChangeStatusBarStyle}
          renderNavBar={renderNavBar}
          renderContent={renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          setEndReached={setEndReached}
          innerContainerStyle={styles.container}
        />
      </View>
    );
  }
}

export default ParallaxHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});