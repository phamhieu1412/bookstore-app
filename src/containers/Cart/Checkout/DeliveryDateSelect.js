import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';

import { Icon } from '../../../Omni';
import cartStyles from '../styles';
import Constants from '../../../common/Constants';

class DateCalendarPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  parseDeliveryTime = deliveryTime => {
    const today = new Date();
    const weekDays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const dateTime = new Date(deliveryTime);
    const hour = 10; // dateTime.getHours();
    const date = `${dateTime.getDate()} tháng ${dateTime.getMonth() + 1}`;
    const weekday = weekDays[dateTime.getDay()];
    let day = '';
    const diff = dateTime.getDate() - today.getDate();
    day = diff === 0 ? 'Hôm nay' : diff === 1 ? 'Ngày mai' : diff === 2 ? 'Ngày kia' : '';

    return { day, weekday, date, hour };
  };

  render() {
    const locals = this.props.locals;
    const stylesheet = locals.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    if (locals.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
    }

    if (locals.disabled) {
      touchableStyle = stylesheet.dateTouchable.notEditable;
    }
    const options = [];
    const nextDay = moment().hour() >= 19 ? 1 : 0;
    for (let i = nextDay; i < nextDay + 3; i++) {
      const dateValue = moment()
        .add(i, 'days')
        .format(Constants.isoDateFormat);
      const { day, weekday, date } = this.parseDeliveryTime(dateValue);
      options.push({
        value: dateValue,
        label: `${day ? `${day} - ` : ''}${weekday}, ${date}`,
      });
    }

    const { day, weekday, date } = this.parseDeliveryTime(locals.value);
    return (
      <RNPickerSelect
        placeholder={{}}
        items={options}
        onValueChange={locals.onChange}
        style={{
          inputIOS: cartStyles.fieldInfo,
          inputAndroid: cartStyles.fieldInfo,
        }}
        useNativeAndroidPickerStyle={false}
        value={locals.value}>
        <View
          activeOpacity={0.8}
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={this.onPress}>
          <View style={[cartStyles.fieldContainer, { minHeight: 65, flexDirection: 'row' }]}>
            <View style={cartStyles.fieldIconWrapper}>
              <View style={cartStyles.fieldIconWithText}>
                <Icon name="clock-end" size={27} style={cartStyles.fieldIcon} />
                <Text style={cartStyles.editableText}>Thay đổi</Text>
              </View>
              <View style={[cartStyles.fieldSeparator, { height: 55 }]} />
            </View>
            <View style={cartStyles.fieldContent}>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                {day ? <Text style={cartStyles.fieldLabel}>{day}</Text> : null}
                <Text style={cartStyles.fieldInfo}>
                  {day ? ' - ' : ''}
                  {weekday}, {date}
                </Text>
              </View>
              {/* <Text style={cartStyles.fieldLabel}>Từ {hour} giờ sáng</Text> */}
            </View>
          </View>
        </View>
      </RNPickerSelect>
    );
  }
}

DateCalendarPicker.propTypes = {
  locals: PropTypes.object.isRequired,
};

function datepicker(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <DateCalendarPicker locals={locals} />
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;

// const styles = StyleSheet.create({
//   modalContainer: {
//     minHeight: 360,
//   },
// });
