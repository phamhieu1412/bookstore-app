import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Color from '../../common/Color';

function inlineInput(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  // let formGroupStyle = stylesheet.formGroup.normal;
  // let controlLabelStyle = stylesheet.controlLabel.normal;
  // let selectStyle = Object.assign(
  //   {
  //     paddingLeft: 7,
  //     fontSize: 16,
  //     color: Color.Text,
  //   },
  //   stylesheet.pickerTouchable.normal,
  //   stylesheet.pickerContainer.normal
  // );
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    // formGroupStyle = stylesheet.formGroup.error;
    // controlLabelStyle = stylesheet.controlLabel.error;
    // selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  const label = locals.label ? <Text style={styles.itemLeft}>{locals.label}</Text> : null;
  const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  // const options = locals.options.map(({ value, text }) => ({
  //   value,
  //   label: text,
  // }));

  return (
    <View style={styles.itemRow}>
      {label}
      <TextInput
        style={styles.itemRight}
        placeholder={locals.placeholder}
        onChangeText={locals.onChange}
        value={locals.value}
      />
      {help}
      {error}
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.product.InfoBorder,
    backgroundColor: Color.background,
    paddingHorizontal: 15,
    // paddingTop: 18,
    // paddingBottom: 18,
    minHeight: 50,
  },
  itemLeft: {
    color: Color.darkGrey,
    fontSize: 16,
    fontWeight: '400',
  },
  itemRight: {
    color: Color.Text,
    fontSize: 16,
    textAlign: 'right',
    padding: 5,
    // borderRadius: 4,
    minWidth: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default inlineInput;
