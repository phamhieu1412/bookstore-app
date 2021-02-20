import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { Icon } from '../../Omni';
import Color from '../../common/Color';

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  // let formGroupStyle = stylesheet.formGroup.normal;
  // let controlLabelStyle = stylesheet.controlLabel.normal;
  // let selectStyle = Object.assign(
  //   {
  //     paddingLeft: 7,
  //     paddingRight: 27,
  //     fontSize: 16,
  //     color: Color.Text,
  //     borderWidth: 0,
  //     textAlign: 'right',
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

  // log(locals);
  const options = locals?.config?.options
    ? locals.config.options.map(({ value, text }) => ({
        value,
        label: text,
      }))
    : [];
  // locals.config.options.map(({ value, text }) => ({
  //   value,
  //   label: text,
  // }));

  return (
    <View style={styles.itemRow}>
      {label}
      <View style={styles.selectContainer}>
        <RNPickerSelect
          placeholder={locals.config.placeholder ? { label: locals.config.placeholder } : null}
          items={options}
          onValueChange={locals.onChange}
          style={{
            inputIOS: styles.itemRight,
            inputAndroid: styles.itemRight,
            iconContainer: {
              top: 8,
              // right: 10,
            },
          }}
          useNativeAndroidPickerStyle={false}
          value={locals.value}
          Icon={() => {
            return <Icon style={styles.selectIcon} name={'chevron-right'} />;
          }}
        />
      </View>
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
    // fontSize: Styles.FontSize.small,
    fontWeight: '400',
  },
  selectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRight: {
    flexDirection: 'row',
    color: Color.Text,
    fontSize: 16,
    // textAlign: 'right',
    padding: 5,
    paddingRight: 25,
    borderRadius: 0,
    minWidth: 25,
  },
  selectIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginBottom: 16,
    color: Color.Text,
  },
});

export default select;
