import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';
import TestScreen from '../screens/TestScreen';
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import StylistHomeScreen from '../screens/stylist/StylistHomeScreen';

// const ClientPath =  TabNavigator({
//   Client : {
//     screen: ClientHomeScreen,
//   }
// });

// const StylistPath =  TabNavigator({
//   Stylist: {
//     screen: StylistHomeScreen,
//   }
// });

// // here's the key to handle which account is logged
// export const Check = SwitchNavigator({
//   Client: ClientPath,
//   Stylist: StylistPath
// })
export default TabNavigator(
  {
    Test: {
      screen: StylistHomeScreen,
      screen: ClientHomeScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Sign Out':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);



// if (user != null && this.state.role == 'client') {
//   navigate('ClientHomeScreen')
// } elseif(user!=null && this.state.role == 'stylist') {
//     navigate('StylistHomeScreen')
// } else {
//   console.log("Unable to check user and role")
// }
