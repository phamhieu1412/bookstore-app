import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Tcomb from 'tcomb-form-native';

import { toast } from '../../Omni';
// import { getName } from '../../ultils/userHelpers';
import styles from './styles';
// import AddressForm from './AddressForm';
import antradeWorker from '../../api/apiWorker';
import Languages from '../../common/Languages';
import Color from '../../common/Color';

import TcomInlineInput from '../../components/TcomInlineInput';
import TcomInlineSelect from '../../components/TcomInlineSelect';
import ShopButton from '../../components/ShopButton';

const Form = Tcomb.form.Form;

const formStylesheet = {
  ...Tcomb.form.Form.stylesheet,
  formGroup: {
    ...Tcomb.form.Form.stylesheet.formGroup,
    normal: {
      paddingVertical: 10,
      paddingLeft: 17,
      paddingRight: 16,
      borderBottomWidth: 1,
      borderBottomColor: Color.product.InfoBorder,
      backgroundColor: Color.background,
    },
  },
  controlLabel: {
    ...Tcomb.form.Form.stylesheet.controlLabel,
    normal: {
      fontSize: 16,
      color: Color.darkGrey,
      letterSpacing: 0,
      fontWeight: 'normal',
      marginBottom: 7,
    },
  },
  textbox: {
    ...Tcomb.form.Form.stylesheet.textbox,
    normal: {
      fontSize: 16,
      color: Color.Text,
      // height: 44,
      paddingBottom: 7,
      paddingHorizontal: 0,
      borderRadius: 4,
      borderColor: '#cccccc',
      borderWidth: 0,
      marginBottom: 5,
    },
  },
};

class ShippingAddress extends Component {
  constructor(props) {
    super(props);

    const { route, userProfile } = props;
    const address = route.params && route.params.address ? route.params.address : {};
    this.state = {
      value: {
        name: address.name || userProfile.name,
        phoneNumber: address.phoneNumber || userProfile.phone,
        area: address?.area?.code || '1',
        city: address?.city?.code || '01',
        district: address?.district?.code || '',
        ward: address?.ward?.code || '',
        text: address.text || '',
      },
      defaultAddress: address.default || false,
      addressId: address.id || '',
      areas: [
        { value: '1', text: 'Miền Bắc' },
        { value: '2', text: 'Miền Trung' },
        { value: '3', text: 'Miền Nam' },
      ],
      cities: [],
      districts: [],
      wards: [],
    };

    this.initFormValues();
  }

  componentDidMount() {
    this.getCities();
    this.getDistricts();
    this.getWards();
  }

  onChange = value => {
    const { value: oldValue } = this.state;
    const newValue = {
      ...value,
    };
    if (oldValue.area !== value.area) {
      newValue.city = '';
      newValue.district = '';
      newValue.ward = '';
      this.setState(
        {
          cities: [],
          districts: [],
          wards: [],
          value: newValue,
        },
        this.getCities
      );
      return;
    }

    if (oldValue.city !== value.city) {
      newValue.district = '';
      newValue.ward = '';
      this.setState(
        {
          districts: [],
          wards: [],
          value: newValue,
        },
        () => {
          this.getDistricts();
        }
      );

      return;
    }

    if (oldValue.district !== value.district) {
      newValue.ward = '';
      this.setState(
        {
          wards: [],
          value: newValue,
        },
        () => {
          this.getWards();
        }
      );
    }

    this.setState({
      value: newValue,
    });
  };

  onChangeDefaultValue = value => {
    this.setState({
      defaultAddress: value,
    });
  };

  onSubmit = () => {
    const { value, areas, cities, districts, wards, addressId, defaultAddress } = this.state;
    if (!value.area || !value.city || !value.district || !value.ward) {
      toast('Bạn cần nhập đầy đủ thông tin bắt buộc');
      return;
    }
    const selectedArea = areas.find(item => item.value === value.area);
    const selectedCity = cities.find(item => item.value === value.city);
    const selectedDistrict = districts.find(item => item.value === value.district);
    const selectedWard = wards.find(item => item.value === value.ward);
    const payload = {
      Name: value.name,
      PhoneNumber: value.phoneNumber,
      Text: value.text,
      Area: { Code: selectedArea.value, Name: selectedArea.text },
      City: { Code: selectedCity.value, Name: selectedCity.text },
      District: { Code: selectedDistrict.value, Name: selectedDistrict.text },
      Ward: { Code: selectedWard.value, Name: selectedWard.text },
      Coordinate: {
        Lat: selectedWard.latitude ? Number.parseFloat(selectedWard.latitude) : 0,
        Lng: selectedWard.longitude ? Number.parseFloat(selectedWard.longitude) : 0,
      },
      Default: !!defaultAddress,
    };

    if (addressId) {
      this.props.updateAddress(addressId, payload);
    } else {
      this.props.addAddress(payload);
    }

    this.props.navigation.goBack();
  };

  getCities = () => {
    const { value } = this.state;
    if (!value.area) {
      return;
    }
    antradeWorker
      .getCities(value.area)
      .then(json => {
        if (json && !json.error) {
          const cities = json.map(item => ({
            value: item.provinceCode,
            text: item.provinceName,
          }));
          this.setState({ cities });
        }
      })
      .catch(() => {});
  };

  getDistricts = () => {
    const { value } = this.state;
    if (!value.area || !value.city) {
      return;
    }
    antradeWorker
      .getDistricts(value.area, value.city)
      .then(json => {
        if (json && !json.error) {
          const districts = json.map(item => ({
            value: item.districtCode,
            text: item.districtName,
          }));
          this.setState({ districts });
        }
      })
      .catch(() => {});
  };

  getWards = () => {
    const { value } = this.state;
    if (!value.area || !value.city || !value.district) {
      return;
    }
    antradeWorker
      .getWards(value.area, value.city, value.district)
      .then(json => {
        if (json && !json.error) {
          const wards = json.map(item => ({
            value: item.townCode,
            text: item.townName,
            latitude: item.latitude,
            longitude: item.longitude,
          }));
          this.setState({ wards });
        }
      })
      .catch(() => {});
  };

  initFormValues = () => {
    const Area = Tcomb.enums({
      1: 'Miền Bắc',
      2: 'Miền Trung',
      3: 'Miền Nam',
    });

    // define profile form
    const formFields = {
      name: Tcomb.String,
      phoneNumber: Tcomb.String,
      area: Area,
      city: Tcomb.String,
      district: Tcomb.String,
      ward: Tcomb.String,
      text: Tcomb.maybe(Tcomb.String),
    };

    this.getOptions();

    this.ShippingAddressForm = Tcomb.struct(formFields);
  };

  getOptions = () => {
    // form options
    this.options = {
      auto: 'none', // we have labels and placeholders as option here (in Engrish, ofcourse).
      stylesheet: formStylesheet,
      fields: {
        name: {
          label: Languages.Name,
          placeholder: Languages.TypeName,
          error: Languages.EmptyError, // for simple empty error warning.
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          template: TcomInlineInput,
        },
        phoneNumber: {
          label: Languages.Phone,
          placeholder: Languages.TypePhone,
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          autoCorrect: false,
          template: TcomInlineInput,
        },
        area: {
          label: Languages.Area,
          error: Languages.NotSelected,
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          nullOption: false,
          config: {
            placeholder: Languages.TypeArea,
            options: this.state.areas,
          },
          template: TcomInlineSelect,
        },
        city: {
          label: Languages.City,
          error: Languages.NotSelected,
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          nullOption: false,
          config: {
            placeholder: Languages.TypeCity,
            options: this.state.cities,
          },
          template: TcomInlineSelect,
        },
        district: {
          label: Languages.District,
          error: Languages.NotSelected,
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          nullOption: false,
          config: {
            placeholder: Languages.TypeDistrict,
            options: this.state.districts,
          },
          template: TcomInlineSelect,
        },
        ward: {
          label: Languages.Ward,
          error: Languages.NotSelected,
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          nullOption: false,
          config: {
            placeholder: Languages.TypeWard,
            options: this.state.wards,
          },
          template: TcomInlineSelect,
        },
        text: {
          label: Languages.DetailAddress,
          placeholder: Languages.TypeDetailAddress,
          underlineColorAndroid: 'transparent',
          // placeholderTextColor: Color.blackTextSecondary,
          autoCorrect: false,
        },
      },
      i18n: {
        optional: '',
        required: ' *',
        // add: 'Add', // add button
        // remove: '✘', // remove button
        // up: '↑', // move up button
        // down: '↓', // move down button
      },
    };

    return this.options;
  };

  render() {
    const { value, addressId, defaultAddress } = this.state;
    // const { user } = this.props;
    // const name = getName(user);
    this.getOptions();

    return (
      <View style={[styles.container, { backgroundColor: Color.backgroundLightGrey }]}>
        <KeyboardAwareScrollView style={styles.form} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <Form
              ref="form"
              type={this.ShippingAddressForm}
              options={this.options}
              value={value}
              onChange={this.onChange}
            />
            {addressId ? (
              <View style={[styles.itemRow, { marginTop: 10 }]}>
                <Text style={styles.itemLeftText}>{'Đặt làm địa chỉ mặc định'}</Text>
                <View style={styles.itemRightContainer}>
                  <View style={[{ padding: 5 }]}>
                    <Switch
                      value={defaultAddress}
                      trackColor={Color.primary}
                      // ios_backgroundColor={Color.primary}
                      style={[styles.requestShipSwitch]}
                      onValueChange={this.onChangeDefaultValue}
                    />
                  </View>
                </View>
              </View>
            ) : null}

            <ShopButton
              onPress={this.onSubmit}
              style={{ marginTop: 30 }}
              text={Languages.SaveProfile}
            />
            {/* <TouchableOpacity style={styles.btnAdd} onPress={this.saveProfile}>
                <Text style={styles.add}>{Languages.SaveProfile}</Text>
              </TouchableOpacity> */}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userProfile: user.user,
  addressList: user.addressList,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  // const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  // const { actions: CurrencyActions } = require("@redux/CurrencyRedux");
  const { actions: UserActions } = require('../../redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    getAddressList: () => {
      dispatch(UserActions.getAddressList());
    },
    addAddress: payload => {
      dispatch(UserActions.addAddress(payload));
    },
    updateAddress: (addressId, payload) => {
      dispatch(UserActions.updateAddress(addressId, payload));
    },
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(ShippingAddress);
