import React, { PureComponent } from "react";
import { TouchableOpacity, Text, View } from "react-native";

import styles from './styles';
import Color from "../../common/Color";
import { Icon } from "../../Omni";

class Button extends PureComponent {
  render() {
    const {
      text,
      icon,
      onPress,
      button,
      containerStyle,
      textStyle,
      containerColor,
      textColor,
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          button,
          { backgroundColor: containerColor },
          containerStyle,
        ]}
        onPress={onPress}>
        {icon ? (
          <Icon name={icon} color={textColor} size={24} style={styles.icon} />
        ) : (
          <View />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  text: "Button",
  onPress: () => "Button pressed!",
  containerStyle: {},
  textStyle: {},
  containerColor: Color.theme2,
  textColor: "white",
};

export default Button;
