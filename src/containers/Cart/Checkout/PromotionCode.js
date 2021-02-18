import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import { UboIcon } from '../../../Omni';
import cartStyles from '../styles';
import styles from './styles';
import Color from '../../../common/Color';

class PromotionCode extends React.Component {
  constructor(props) {
    super(props);

    const { locals, promotionCodes } = props;
    // const { promotionCodes } = locals.config;
    const selectedCode =
      locals.value && promotionCodes
        ? promotionCodes.find(code => code.id === locals.value)
        : false;
    this.state = { couponCode: selectedCode ? selectedCode.giftCode : '' };
  }

  onChange = code => {
    const { locals } = this.props;
    const codeId = code ? code.id : '';
    this.setState({ couponCode: code ? code.giftCode : '' });

    locals.onChange(codeId);
  };

  render() {
    const { locals, promotionCodes } = this.props;
    // const stylesheet = locals.stylesheet;
    // let touchableStyle = stylesheet.dateTouchable.normal;
    // let dateValueStyle = stylesheet.dateValue.normal;
    if (locals.hasError) {
      // touchableStyle = stylesheet.dateTouchable.error;
      // datepickerStyle = stylesheet.datepicker.error;
      // dateValueStyle = stylesheet.dateValue.error;
    }

    if (locals.disabled) {
      // touchableStyle = stylesheet.dateTouchable.notEditable;
    }

    // const { promotionCodes } = locals.config;
    // if (!promotionCodes.length) {
    //   return <View />;
    // }

    const selectedCode =
      locals.value && promotionCodes
        ? promotionCodes.find(code => code.id === locals.value)
        : false;
    const placeholder = locals.placeholder;
    // const { couponCode } = this.state;
    return (
      <View>
        <View>
          {promotionCodes && promotionCodes.length ? (
            <FlatList
              key={`code_list_for_${selectedCode ? selectedCode.id : ''}`}
              keyExtractor={(item, index) => `coupon__${index}`}
              overScrollMode="never"
              showsHorizontalScrollIndicator={false}
              horizontal
              data={promotionCodes}
              renderItem={({ item }) => {
                const selected = selectedCode && item.id === selectedCode.id;
                return (
                  <TouchableOpacity
                    onPress={() => this.onChange(item)}
                    activeOpacity={0.8}
                    style={[styles.giftCode, selected && { backgroundColor: '#EDFEE5' }]}>
                    {selected ? (
                      <Text
                        style={[
                          styles.giftCodeValue,
                          {
                            color: Color.Text,
                            fontWeight: '400',
                            textDecorationLine: 'line-through',
                          },
                        ]}>
                        {item.giftCode}
                      </Text>
                    ) : (
                      <Text style={styles.giftCodeValue}>{item.giftCode}</Text>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </View>
        <View
          style={[
            cartStyles.fieldContainer,
            { minHeight: 65, flexDirection: 'row', backgroundColor: '#EDFEE5' },
          ]}>
          <View style={cartStyles.fieldIconWrapper}>
            <View style={cartStyles.fieldIconWithText}>
              <UboIcon
                name="pocket"
                size={27}
                style={[cartStyles.fieldIcon, { color: Color.secondary }]}
              />
            </View>
            <View style={[cartStyles.fieldSeparator, { height: 55 }]} />
          </View>
          <View style={[cartStyles.fieldContent, styles.couponCodeWrapper]}>
            <View style={[styles.couponCode, selectedCode && { backgroundColor: Color.secondary }]}>
              <Text style={styles.couponCodeValue}>
                {selectedCode ? selectedCode.giftCode : ''}
                {/* {this.state.couponCode} */}
              </Text>
              {selectedCode ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.closeIcon}
                  hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  onPress={() => this.onChange(false)}>
                  <UboIcon
                    name="x"
                    size={7}
                    style={{
                      color: Color.blackTextSecondary,
                      marginLeft: 3,
                      marginRight: 6,
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <Text style={styles.couponCodeDesc} numberOfLines={2}>
              {!promotionCodes || !promotionCodes.length
                ? 'Không có mã giảm giá khả dụng'
                : selectedCode
                ? selectedCode.name
                : placeholder}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

PromotionCode.propTypes = {
  locals: PropTypes.object.isRequired,
};

const mapStateToProps = ({ carts }) => {
  return {
    promotionCodes: carts.promotionCodes || [],
  };
};

export default connect(
  mapStateToProps,
  undefined,
  undefined
)(PromotionCode);
