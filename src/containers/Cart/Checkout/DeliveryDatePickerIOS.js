import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, DatePickerIOS, TouchableOpacity } from 'react-native';

// import { Color } from '@common';
import { UboIcon } from '../../../Omni';
import cartStyles from '../styles';

const UIPICKER_HEIGHT = 216;

class CollapsibleDatePickerIOS extends React.Component {
  constructor(props) {
    super(props);
    this._onDateChange = this.onDateChange.bind(this);
    this._onPress = this.onPress.bind(this);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0),
    };
  }

  onDateChange(value) {
    this.props.locals.onChange(value);
  }

  onPress() {
    const locals = this.props.locals;
    let animation = Animated.timing;
    let animationConfig = {
      duration: 200,
    };
    if (locals.config) {
      if (locals.config.animation) {
        animation = locals.config.animation;
      }
      if (locals.config.animationConfig) {
        animationConfig = locals.config.animationConfig;
      }
    }
    animation(
      this.state.height,
      Object.assign(
        {
          toValue: this.state.isCollapsed ? UIPICKER_HEIGHT : 0,
        },
        animationConfig
      )
    ).start();
    this.setState({ isCollapsed: !this.state.isCollapsed });
    if (typeof locals.onPress === 'function') {
      locals.onPress();
    }
  }

  parseDeliveryTime = deliveryTime => {
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

  render() {
    const locals = this.props.locals;
    const stylesheet = locals.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    let datepickerStyle = stylesheet.datepicker.normal;
    // let dateValueStyle = stylesheet.dateValue.normal;
    if (locals.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
      datepickerStyle = stylesheet.datepicker.error;
      // dateValueStyle = stylesheet.dateValue.error;
    }

    if (locals.disabled) {
      touchableStyle = stylesheet.dateTouchable.notEditable;
    }

    // let formattedValue = locals.value ? String(locals.value) : '';
    // if (locals.config) {
    //   if (locals.config.format && formattedValue) {
    //     formattedValue = locals.config.format(locals.value);
    //   } else if (!formattedValue) {
    //     formattedValue = locals.config.defaultValueText
    //       ? locals.config.defaultValueText
    //       : 'Chọn thời gian nhận hàng';
    //   }
    // }
    const height = this.state.isCollapsed ? 0 : UIPICKER_HEIGHT;
    const { day, weekday, date, hour } = this.parseDeliveryTime(locals.value);
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={this._onPress}>
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
        </TouchableOpacity>
        <Animated.View style={{ height: this.state.height, overflow: 'hidden' }}>
          <DatePickerIOS
            ref="input"
            accessibilityLabel={locals.label}
            date={locals.value || new Date()}
            initialDate={new Date()}
            maximumDate={locals.maximumDate}
            minimumDate={locals.minimumDate}
            minuteInterval={locals.minuteInterval}
            mode={locals.mode}
            onDateChange={this._onDateChange}
            timeZoneOffsetInMinutes={locals.timeZoneOffsetInMinutes}
            style={[datepickerStyle, { height }]}
          />
        </Animated.View>
      </View>
    );
  }
}

CollapsibleDatePickerIOS.propTypes = {
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
      <CollapsibleDatePickerIOS locals={locals} />
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;
