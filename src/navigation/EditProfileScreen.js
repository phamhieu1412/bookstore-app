import React, { PureComponent } from 'react';

import { Back, EmptyView } from './IconNavigation';
import Color from '../common/Color';
import Styles from '../common/Styles';
import EditProfile from '../containers/EditProfile';

class EditProfileScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { navigation, route } = this.props;
    const headerStyle = Styles.Common.toolbar();
    const noBackButton = route.params && route.params.noBackButton;

    this.props.navigation.setOptions({
      headerLeft: noBackButton ? () => EmptyView() : () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: null,

      headerTintColor: Color.headerTintColor,
      headerStyle,
    });
  }

  onBack = () => {
    const { navigation, route } = this.props;
    const { backRoute } = route.params || {};

    if (backRoute) navigation.navigate(backRoute);
    else navigation.goBack();
  };

  render() {
    const { navigation, route } = this.props;
    const { noBackButton, focusField } = route.params || {};

    return (
      <EditProfile
        onBack={this.onBack}
        isNewUser={noBackButton}
        focusField={focusField}
        navigation={navigation}
      />
    );
  }
}

export default EditProfileScreen;
