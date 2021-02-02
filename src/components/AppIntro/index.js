import React, { PureComponent } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../../ultils/statusBar';
import Config from '../../common/Config';
import Images from '../../common/Images';

class AppIntro extends PureComponent {
  getRandom = (arr, n) => {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };
  _renderItem = props => (
    <View
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}>
      <FastImage
        source={Images[props.image]}
        style={[styles.backgroundImage, { width: props.width, height: props.height }]}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name={'md-arrow-round-forward'}
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  componentDidMount() {
    setBarStyle('light-content');
    setTranslucent(true);
    setBackgroundColor('transparent');
  }

  render() {
    const introData = Config.intro;
    const randomImages = this.getRandom(['01', '02', '03'], introData.length);
    introData.forEach((item, index) => {
      item.image = `intro${randomImages[index]}`;
    });
    return (
      <AppIntroSlider
        slides={introData}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this.props.finishIntro}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux/UserRedux');
  return {
    finishIntro: () => dispatch(actions.finishIntro()),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(AppIntro);
