import React from 'react';
import { View, Text, StyleSheet, LayoutAnimation, TouchableOpacity } from 'react-native';
import { isObject } from 'lodash';
import { connect } from 'react-redux';
import Constants from '../../common/Constants';

import Styles from '../../common/Styles';
import { EventEmitter, Timer } from '../../Omni';

class MyToast extends React.Component {
  constructor(props) {
    super(props);
    this.nextToastId = 0;
    this.renderToast = this.renderToast.bind(this);
  }

  componentDidMount() {
    this.toastListener = EventEmitter.addListener(
      Constants.EmitCode.Toast,
      this.doToast.bind(this)
    );
  }

  componentWillUnmount() {
    this.toastListener.remove();
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  render() {
    const { toast } = this.props;
    return <View style={styles.container}>{toast.list.map(this.renderToast)}</View>;
  }

  renderToast(msg, index) {
    if ((msg && !msg.msg) || (msg && isObject(msg.msg))) return null;

    const { removeToast } = this.props;
    const onPress = () => removeToast(msg.key);
    return (
      <TouchableOpacity key={index} style={styles.textWrap} onPress={onPress}>
        <Text style={styles.text}>{msg.msg}</Text>
      </TouchableOpacity>
    );
  }

  doToast(msg, duration = 3000) {
    const { addToast, removeToast } = this.props;
    const key = this.nextToastId++; // unique message key
    addToast(msg, key);
    Timer.setTimeout(() => removeToast(key), duration);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Styles.height / 3,
    left: Styles.width / 20,
    right: Styles.width / 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  textWrap: {
    backgroundColor: 'rgba(60,60,60,0.6)',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    toast: state.toast,
  };
};

const mapDispatchToProps = dispatch => {
  const { actions } = require('../../redux/index');
  return {
    addToast: (msg, key) => dispatch(actions.addToast(msg, key)),
    removeToast: msg => dispatch(actions.removeToast(msg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyToast);
