import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Icon } from '../../Omni';
import { getName, getAvatar } from '../../ultils/UserHelpers';
import styles from './styles';
import Languages from '../../common/Languages';
import Color from '../../common/Color';

class UserProfileHeader extends PureComponent {
  //   constructor(props) {
  //     super(props)
  //   }
  static propTypes = {
    onEditProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
  };

  // loginHandle = () => {
  //   if (!this.props.token) {
  //     this.props.onLogin();
  //   } else {
  //     this.props.onLogout();
  //   }
  // };

  render() {
    const { user, token, onEditProfile } = this.props;
    const avatar = getAvatar(user);

    return (
      <View style={[styles.container, { backgroundColor: Color.background }]}>
        <View style={styles.header}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={[styles.fullName, { color: Color.Text }]}>{getName(user)}</Text>
            {token ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onEditProfile}
                style={styles.actionLink}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Text style={styles.actionText}>{Languages.EditProfile}</Text>
                <Icon name="chevron-right" style={styles.actionIcon}></Icon>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

export default UserProfileHeader;
