import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Back, CartWishListIcons, CartWishListUserIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import { Icon } from '../Omni';
import UserProfile from '../containers/UserProfile/index';
import Languages from '../common/Languages';
import Styles from '../common/Styles';

class UserProfileScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.props.navigation.setOptions({
      headerLeft: () => Back(navigation),
      headerRight: () => CartWishListUserIcons(navigation),
      headerTitle: Languages.Account,

      headerTitleStyle: [
        Styles.Common.headerStyle,
        {
          color: 'black',
        },
      ],
    });

    this._navListener = this.props.navigation.addListener('focus', () => {
      setBarStyle('dark-content');
      setTranslucent(false);
      setBackgroundColor('transparent');
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  render() {
    const { navigation } = this.props;

    return <UserProfile navigation={navigation} />;
  }
}

export default UserProfileScreen;
