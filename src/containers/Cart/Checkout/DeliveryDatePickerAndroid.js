import React from 'react';
import {
  View,
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableNativeFeedback,
} from 'react-native';

// import { Color } from '@common';
import { UboIcon } from '../../../Omni';
import cartStyles from '../styles';

function datepicker(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var datepickerStyle = stylesheet.datepicker.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  var dateValueStyle = stylesheet.dateValue.normal;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    datepickerStyle = stylesheet.datepicker.error;
    helpBlockStyle = stylesheet.helpBlock.error;
    dateValueStyle = stylesheet.dateValue.error;
  }

  // Setup the picker mode
  var datePickerMode = locals.mode;
  if (datePickerMode !== 'date' && datePickerMode !== 'time' && datePickerMode !== 'datetime') {
    throw new Error(`Unrecognized date picker format ${datePickerMode}`);
  }

  /**
   * Check config locals for Android datepicker.
   * `locals.config.background: `TouchableNativeFeedback` background prop
   * `locals.config.format`: Date format function
   * `locals.config.dialogMode`: 'calendar', 'spinner', 'default'
   * `locals.config.dateFormat`: Date only format
   * `locals.config.timeFormat`: Time only format
   */
  var formattedValue = locals.value ? String(locals.value) : '';
  var background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap
  var dialogMode = 'spinner';
  var formattedDateValue = locals.value ? locals.value.toDateString() : '';
  var formattedTimeValue = locals.value ? locals.value.toTimeString() : '';
  if (locals.config) {
    if (locals.config.format && formattedValue) {
      formattedValue = locals.config.format(locals.value);
    } else if (!formattedValue) {
      formattedValue = locals.config.defaultValueText
        ? locals.config.defaultValueText
        : 'Tap here to select a date';
    }
    if (locals.config.background) {
      background = locals.config.background;
    }
    if (locals.config.dialogMode) {
      dialogMode = locals.config.dialogMode;
    }
    if (locals.config.dateFormat && formattedDateValue) {
      formattedDateValue = locals.config.dateFormat(locals.value);
    } else if (!formattedDateValue) {
      formattedDateValue = locals.config.defaultValueText
        ? locals.config.defaultValueText
        : 'Chọn thời gian nhận hàng';
    }
    if (locals.config.timeFormat && formattedTimeValue) {
      formattedTimeValue = locals.config.timeFormat(locals.value);
    } else if (!formattedTimeValue) {
      formattedTimeValue = locals.config.defaultValueText
        ? locals.config.defaultValueText
        : 'Tap here to select a time';
    }
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  // var value = formattedValue ? <Text style={dateValueStyle}>{formattedValue}</Text> : null;

  const parseDeliveryTime = deliveryTime => {
    const today = new Date();
    const weekDays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const dateTime = new Date(deliveryTime);
    const hour = dateTime.getHours();
    const date = `${dateTime.getDate()} tháng ${dateTime.getMonth() + 1}`;
    const weekday = weekDays[dateTime.getDay()];
    let day = '';
    const diff = dateTime.getDate() - today.getDate();
    day = diff === 0 ? 'Hôm nay' : diff === 1 ? 'Ngày mai' : diff === 2 ? 'Ngày kia' : '';

    return { day, weekday, date, hour };
  };

  const { day, weekday, date, hour } = parseDeliveryTime(locals.value);
  return (
    <View style={formGroupStyle}>
      {label}
      <TouchableNativeFeedback
        accessible
        disabled={locals.disabled}
        ref="input"
        background={background}
        onPress={() => {
          if (datePickerMode === 'time') {
            const now = new Date();
            const isDate = locals.value && locals.value instanceof Date;
            let setTime = {
              hour: isDate ? locals.value.getHours() : now.getHours(),
              minute: isDate ? locals.value.getMinutes() : now.getMinutes(),
            };
            TimePickerAndroid.open({
              is24Hour: true,
              hour: setTime.hour,
              minute: setTime.minute,
            }).then(function(time) {
              if (time.action !== TimePickerAndroid.dismissedAction) {
                const newTime = new Date();
                newTime.setHours(time.hour);
                newTime.setMinutes(time.minute);
                locals.onChange(newTime);
              }
            });
          } else if (datePickerMode === 'date') {
            let config = {
              date: locals.value || new Date(),
              mode: dialogMode,
            };
            if (locals.minimumDate) {
              config.minDate = locals.minimumDate;
            }
            if (locals.maximumDate) {
              config.maxDate = locals.maximumDate;
            }
            DatePickerAndroid.open(config).then(function(date) {
              if (date.action !== DatePickerAndroid.dismissedAction) {
                var newDate = new Date(date.year, date.month, date.day);
                locals.onChange(newDate);
              }
            });
          }
          if (typeof locals.onPress === 'function') {
            locals.onPress();
          }
        }}>
        <View style={[cartStyles.fieldContainer, { minHeight: 65, flexDirection: 'row' }]}>
          <View style={cartStyles.fieldIconWrapper}>
            <UboIcon name="clock" size={27} style={cartStyles.fieldIcon} />
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
            <Text style={cartStyles.fieldLabel}>Từ {hour} giờ sáng</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;
