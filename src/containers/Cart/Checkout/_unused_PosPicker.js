// https://gist.github.com/herarya/85a79b45415e13169b708e1a3be70e6c

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import { UboIcon } from '../../../Omni';
import cartStyles from '../styles';
import Color from '../../../common/Color';

const { width, height } = Dimensions.get('window');

export default class PosPicker extends Component {
  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      visible: false,
      picked: props.locals.value ? props.locals.value : null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { picked } = prevState;
    if (!picked && nextProps.locals.value) {
      return { picked: nextProps.locals.value };
    }

    return null;
  }

  render() {
    const { locals, options } = this.props;
    const { visible, picked } = this.state;
    // let pickerContainer = cartStyles.fieldContainer;

    if (picked) {
      locals.value = picked;
      locals.hasError = false;
      locals.error = null;
      // locals.onChange(locals.value);
    }

    // if (locals.hasError) {
    //   pickerContainer = Object.asign(cartStyles.fieldContainer, cartStyles.fieldContainerError);
    // }
    const pickedPos = picked ? options.find(opt => opt.key === picked) : false;
    let placeholder = locals.placeholder;
    if (picked && !pickedPos) {
      placeholder = 'POS bạn chọn đã dừng hoạt động. Hãy chọn POS mới';
    }

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={cartStyles.fieldTouchable}
          ref="input"
          onPress={() => {
            this.onShow();
          }}>
          <View style={[cartStyles.fieldContainer, { minHeight: 65, flexDirection: 'row' }]}>
            <View style={cartStyles.fieldIconWrapper}>
              <View style={cartStyles.fieldIconWithText}>
                <UboIcon name="map-pin" size={27} style={cartStyles.fieldIcon} />
                <Text style={cartStyles.editableText}>Thay đổi</Text>
              </View>
              <View style={cartStyles.fieldSeparator} />
            </View>
            {pickedPos ? (
              <View style={cartStyles.fieldContent}>
                <Text style={cartStyles.fieldLabel} numberOfLines={2}>
                  {pickedPos.label}
                </Text>
                <Text style={cartStyles.fieldInfo} numberOfLines={3}>
                  {pickedPos.address}
                </Text>
              </View>
            ) : (
              <View style={cartStyles.fieldContent}>
                <Text style={{ fontSize: 13, color: '#555555' }}>{placeholder}</Text>
              </View>
            )}
            {/* <UboIcon name="edit-3" size={14} style={cartStyles.editableIndicatorIcon} /> */}
          </View>
        </TouchableOpacity>
        <ModalFilterPicker
          visible={visible}
          onSelect={pickedValue => {
            this.onSelect(pickedValue);
          }}
          onCancel={() => {
            this.onCancel();
          }}
          options={options}
          placeholderText={'Tìm kiếm ...'}
          cancelButtonText={'ĐÓNG'}
          title={locals.label}
          listContainerStyle={styles.listContainer}
          cancelContainerStyle={styles.cancelContainer}
          cancelButtonStyle={styles.cancelButton}
          cancelButtonTextStyle={styles.cancelButtonText}
          optionTextStyle={styles.optionTextStyle}
        />
      </View>
    );
  }

  onShow = () => {
    this.setState({ visible: true });
  };

  onSelect = picked => {
    this.setState({
      picked,
      visible: false,
    });

    this.props.selectedValue = picked;
    this.props.setSelectedValue(picked);
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };
}
const optionStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
};

const optionTextStyle = {
  flex: 1,
  textAlign: 'left',
  // fontFamily: 'Montserrat',
  fontSize: 14,
  color: Color.Text,
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    flex: 0,
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
    width: width * 0.8,
    maxHeight: height * 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cancelContainer: {
    width: width * 0.8,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  cancelButton: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  filterTextInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  filterTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 0,
    height: 50,
  },
  categoryStyle: {
    ...optionStyle,
  },
  categoryTextStyle: {
    ...optionTextStyle,
    color: '#999',
    fontStyle: 'italic',
    fontSize: 16,
  },
  optionStyle: {
    ...optionStyle,
  },
  optionStyleLastChild: {
    borderBottomWidth: 0,
  },
  optionTextStyle: {
    ...optionTextStyle,
    color: '#000',
  },
  selectedOptionStyle: {
    ...optionStyle,
  },
  selectedOptionStyleLastChild: {
    borderBottomWidth: 0,
  },
  selectedOptionTextStyle: {
    ...optionTextStyle,
    fontWeight: '700',
  },
  noResults: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    color: '#ccc',
    fontSize: 10,
  },
});

PosPicker.propTypes = {
  locals: PropTypes.object.isRequired,
};
