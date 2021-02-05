import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';

import Color from '../../../common/Color';
import Constants from '../../../common/Constants';
import { UboIcon, log } from '../../../Omni';
import cartStyles from '../styles';

LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayNamesShort: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vn';

class DateCalendarPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalendarModalOpen: false,
    };
  }

  closeCalendarModal = () => {
    this.setState({ isCalendarModalOpen: false });
  };

  openCalendarModal = () => {
    this.setState({ isCalendarModalOpen: true });
  };

  onPress = () => {
    this.openCalendarModal();

    const locals = this.props.locals;
    if (typeof locals.onPress === 'function') {
      locals.onPress();
    }
  };

  onDateChange = value => {
    const date = new Date(value.timestamp);
    // this.closeCalendarModal();
    this.props.locals.onChange(date);
  };

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

  getMarkedDay = day => {
    const selectedDates = {};

    var dayConfig = {
      selected: true,
      selectedColor: Color.primary,
      textColor: Color.white,
    };
    selectedDates[moment(day).format(Constants.isoDateFormat)] = dayConfig;

    return selectedDates;
  };

  render() {
    const locals = this.props.locals;
    const stylesheet = locals.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    // let datepickerStyle = stylesheet.datepicker.normal;
    // let dateValueStyle = stylesheet.dateValue.normal;
    if (locals.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
      // datepickerStyle = stylesheet.datepicker.error;
      // dateValueStyle = stylesheet.dateValue.error;
    }

    if (locals.disabled) {
      touchableStyle = stylesheet.dateTouchable.notEditable;
    }

    const { day, weekday, date, hour } = this.parseDeliveryTime(locals.value);
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={this.onPress}>
          <View style={[cartStyles.fieldContainer, { minHeight: 65, flexDirection: 'row' }]}>
            <View style={cartStyles.fieldIconWrapper}>
              <View style={cartStyles.fieldIconWithText}>
                <UboIcon name="clock" size={27} style={cartStyles.fieldIcon} />
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
              <Text style={cartStyles.fieldLabel}>Từ {hour} giờ sáng</Text>
            </View>
            {/* <UboIcon name="edit-3" size={14} style={cartStyles.editableIndicatorIcon} /> */}
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isCalendarModalOpen}
          swipeToClose={false}
          animationDuration={300}
          onBackdropPress={this.closeCalendarModal}>
          <View style={styles.modalContainer}>
            <Calendar
              current={locals.value || new Date()}
              maxDate={
                locals.maximumDate
                  ? moment(locals.maximumDate).format(Constants.isoDateFormat)
                  : undefined
              }
              minDate={
                locals.minimumDate
                  ? moment(locals.minimumDate).format(Constants.isoDateFormat)
                  : undefined
              }
              onDayPress={this.onDateChange}
              monthFormat={'MMMM'}
              firstDay={1}
              markedDates={this.getMarkedDay(locals.value)}
              theme={{
                backgroundColor: Color.background,
                calendarBackground: Color.background,
                textSectionTitleColor: Color.Text,
                selectedDayBackgroundColor: Color.primary,
                selectedDayTextColor: Color.white,
                todayTextColor: '#00adf5',
                dayTextColor: Color.Text,
                textDisabledColor: Color.blackTextDisable,
                dotColor: Color.primary,
                selectedDotColor: '#ffffff',
                arrowColor: Color.primary,
                monthTextColor: Color.Text,
                indicatorColor: 'blue',
                textDayFontFamily: Constants.fontFamily,
                textMonthFontFamily: Constants.fontFamily,
                textDayHeaderFontFamily: Constants.fontFamily,
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '600',
                textDayFontSize: 15,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 15,
              }}
            />
          </View>
        </Modal>
      </View>
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

const styles = StyleSheet.create({
  modalContainer: {
    minHeight: 360,
  },
});
