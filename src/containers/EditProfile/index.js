import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from 'react-redux';

import { actions as UserActions } from '../../redux/UserRedux';
import { Icon, IconFA, IconFeather, toast } from '../../Omni';
import styles from './styles';
import Languages from '../../common/Languages';

const EditProfileScreen = (props) => {
  // mapStateToProps
  const stateRedux = useSelector(state => state);
  const userRedux = stateRedux.user;

  // mapDispatchToProps
  const dispatch = useDispatch()
  const updateUserProfile = (payload, meta) => dispatch(UserActions.updateUserProfile(payload, meta))
  
  const [image, setImage] = useState('');
  const [userName, setUserName] = useState(userRedux.user.nickname);
  const [userPhone, setUserPhone] = useState(userRedux.user.phone);
  const [userEmail, setUserEmail] = useState(userRedux.user.email);
  const { colors } = useTheme();
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      sheetRef.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      sheetRef.current.snapTo(1);
    });
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>{Languages.UploadPhoto}</Text>
        <Text style={styles.panelSubtitle}>{Languages.ChooseYourProfilePicture}</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>{Languages.TakePhoto}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>{Languages.ChooseFromLibrary}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>{Languages.CANCEL}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const editProfileUser = () => {
    const vnPhone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const vnEmail_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (vnPhone_regex.test(userPhone) == false) {
      toast('Số điện thoại của bạn không đúng định dạng!');
      return;
    }
    if (vnEmail_regex.test(String(userEmail).toLowerCase()) == false) {
      toast('Email của bạn không đúng định dạng!');
      return;
    }

    updateUserProfile({
      first_name: "",
      last_name: userName,
      email: userEmail,
      phone: userPhone,
    }, {
      onSuccess: () => {
        props.navigation.goBack(null);
        toast('Cập nhập thành công');
      },
      onFailure: () => {
        toast(Languages.ErrorMessageRequest);
      },
    });
  }
  
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
            <View style={styles.viewChooseImage}>
              <ImageBackground
                source={require('../../images/avatar.jpg')}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={styles.iconCamera}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {userRedux.user && userRedux.user.nickname}
          </Text>
        </View>

        <View style={styles.action}>
          <IconFA name="user-o" color="#FF6347" size={20} />
          <TextInput
            placeholder={Languages.InputName}
            defaultValue={userRedux.user && userRedux.user.nickname}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={text => setUserName(text)}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={styles.action}>
          <IconFeather name="phone" color="#FF6347" size={20} />
          <TextInput
            placeholder={Languages.InputPhonenumber}
            defaultValue={userRedux.user && userRedux.user.phone}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            onChangeText={text => setUserPhone(text)}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={styles.action}>
          <IconFA name="envelope-o" color="#FF6347" size={20} />
          <TextInput
            placeholder={Languages.InputEmail}
            defaultValue={userRedux.user && userRedux.user.email}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={text => setUserEmail(text)}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => editProfileUser()}>
          <Text style={styles.panelButtonTitle}>{Languages.Edit}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

