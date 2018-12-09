import { Notifications } from 'expo';
import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import Icon from 'react-native-vector-icons/Ionicons';

//Screen imports
import LoginScreen from './../screens/auth/LoginScreen';
import SignupScreen from './../screens/auth/SignupScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import ClientList from './../screens/stylist/ClientList';
import ClientHomeScreen from '../screens/client/ClientHome';
import StylistHomeScreen from '../screens/stylist/StylistHome';

//Zak's ongoing test work
const RootStackNavigator = StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      // navigationOptions: {
      //   tabBarLabel: 'Login',
      //   tabBarIcon: ({ tintColor}) => (
      //     <Icon name="md-log-in" size={24} />
      //   )
      // }
    },
    SignupScreen: {
      screen: SignupScreen,
      // navigationOptions: {
      //   tabBarLabel: 'Signup',
      //   tabBarIcon: ({ tintColor}) => (
      //     <Icon name="md-create" size={24} />
      //   )
      // }
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      // navigationOptions: {
      //   tabBarLabel: 'Forgot Password',
      //   tabBarIcon: ({ tintColor}) => (
      //     <Icon name="md-unlock" size={24} />
      //   )
      // }
    } 
  },
  { 
    initialRouteName: 'LoginScreen'
  },
  // {
  //   tabBarComponent: TabBarBottom,
  //   tabBarPosition: 'bottom',
  //   animationEnabled: true,
  //   swipeEnabled: true,
  // }
);

// const getUserRole = async () => {
//   let role = 'test';
//   try {
//     role = await AsyncStorage.getItem('role') || 'none';
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
//   return role;
// }

export default class RootNavigator extends React.Component {

  // componentWillMount(){
  //   role = getUserRole;
  //   this.props.navigation.navigate(role == 'client' ? 'Client' : 'Stylist');
  // }
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}