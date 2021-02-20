import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from './RootNavigation';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import CategoriesScreen from './CategoriesScreen';
import CategoryScreen from './CategoryScreen';
import DetailScreen from './DetailScreen';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';
import MyOrdersScreen from './MyOrdersScreen';
// import OrderDetailScreen from './OrderDetailScreen';
// import MyMessagesScreen from './MyMessagesScreen';
// import WishListScreen from './WishListScreen';
import SearchScreen from './SearchScreen';
// import ListAllScreen from './ListAllScreen';
import UserProfileScreen from './UserProfileScreen';
import EditProfileScreen from './EditProfileScreen';
// import ShippingAddressScreen from './ShippingAddressScreen';
// import EditAddressScreen from './EditAddressScreen';
import FiltersScreen from './FiltersScreen';
// import InformationScreen from './InformationScreen';
// import LoginScreen from './LoginScreen';
import ShippingAddressScreen from './ShippingAddressScreen';
import EditAddressScreen from './EditAddressScreen';

import { TabBarIcon } from '../components/index';
import Color from '../common/Color';
import Styles from '../common/Styles';
import Languages from '../common/Languages';

const defaultHeaderStyle = {
  headerStyle: Styles.Common.toolbar(),
  headerTintColor: Color.headerTintColor,
  headerTitleStyle: Styles.Common.headerStyle,
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      headerMode="float"
      screenOptions={{
        ...defaultHeaderStyle,
        headerBackTitle: Languages.Back,
        tabBarVisible: true,
      }}
      gestureDirection="horizontal"
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="CategoriesScreen"
      headerMode="float"
      screenOptions={{ ...defaultHeaderStyle, headerBackTitle: Languages.Back }}
      gestureDirection="horizontal">
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        // options={({ navigation, screenProps }) => ({})}
      />
    </Stack.Navigator>
  );
}

// function MyMessagesStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="MyMessagesScreen"
//       headerMode="float"
//       screenOptions={{ ...defaultHeaderStyle, headerBackTitle: Languages.Back }}
//       gestureDirection="horizontal">
//       <Stack.Screen
//         name="MyMessagesScreen"
//         component={MyMessagesScreen}
//         options={() => ({
//           headerTitleAlign: 'left',
//         })}
//       />
//     </Stack.Navigator>
//   );
// }

function UserProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="UserProfileScreen"
      headerMode="float"
      screenOptions={{ ...defaultHeaderStyle, headerBackTitle: Languages.Back }}
      gestureDirection="horizontal"
    >
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={() => ({
          headerTitleAlign: 'left',
        })}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.tabbarTint,
        inactiveTintColor: Color.tabbarColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 13, color: focused ? Color.tabbarTint : Color.tabbarColor }}>
              {Languages.Home}
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon icon="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="CategoriesScreen"
        component={CategoryStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 13, color: focused ? Color.tabbarTint : Color.tabbarColor }}>
              {Languages.Categories}
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon icon="book" color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="MyMessages"
        component={MyMessagesStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 13, color: focused ? Color.tabbarTint : Color.tabbarColor }}>
              {Languages.Notifications}
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon messageIcon icon="bell" color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="UserProfile"
        component={UserProfileStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 13, color: focused ? Color.tabbarTint : Color.tabbarColor }}>
              Tài khoản
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon icon="user" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {/* Main */}
          <Stack.Screen
            name="App"
            component={AppStack}
            options={{
              headerShown: false,
            }}
          />

          {/* Login && SignUp */}
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={({ navigation, screenProps }) => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={({ navigation, screenProps }) => ({
              headerTitleAlign: 'left',
            })}
          />

          {/* Component of tabbottom */}
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="FiltersScreen"
            component={FiltersScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen name="SelectShippingAddressScreen" component={ShippingAddressScreen} />
          <Stack.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} />
          <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} />
          <Stack.Screen
            name="MyOrdersScreen"
            component={MyOrdersScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          {/* <Stack.Screen name="ListAllScreen" component={ListAllScreen} />
          <Stack.Screen
            name="WishListScreen"
            component={WishListScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen name="MyMessagesScreen" component={MyMessagesScreen} />
          <Stack.Screen name="SelectShippingAddressScreen" component={ShippingAddressScreen} />
          <Stack.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} />
          <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} />
          <Stack.Screen
            name="InformationScreen"
            component={InformationScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={() => ({
              headerTitleAlign: 'left',
            })}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
