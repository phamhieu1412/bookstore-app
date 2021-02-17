import React, { PureComponent } from 'react';

import { Back } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Languages from '../common/Languages';
import Styles from '../common/Styles';
import Filters from '../containers/Filters';

class FiltersScreen extends PureComponent {
  componentDidMount() {
    const {navigation} = this.props;

    navigation.setOptions({
      headerLeft: () => Back(navigation),
      headerTitle: Languages.Filters,

      headerTitleStyle: [Styles.Common.headerStyle],
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
    const { navigation, route } = this.props;

    return <Filters navigation={navigation} route={route} onBack={navigation.goBack} />;
  }
}

export default FiltersScreen;
