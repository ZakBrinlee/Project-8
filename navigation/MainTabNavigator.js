import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';
import TestScreen from '../screens/TestScreen';
import ClientHomeScreen from '../screens/client/ClientHome';
import StylistHomeScreen from '../screens/stylist/StylistHome';
import ClientList from '../screens/stylist/ClientList';


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

// export default TabNavigator(
//   {
//     Client: {
//       screen: ClientHomeScreen,
//       navigationOptions: {
//         tabBarLabel: 'Client Home',
//         tabBarIcon: ({ tintColor}) => (
//           <Icon name="ios-home" size={24} />
//         )
//       }
//     },
//     Stylist: {
//       screen: StylistHomeScreen,
//       navigationOptions: {
//         tabBarLabel: 'Stylist Home',
//         tabBarIcon: ({ tintColor}) => (
//           <Icon name="ios-home" size={24} />
//         )
//       }
//     },
//     ClientList: {
//       screen: ClientList,
//       tabBarOptions: {
//         showLabel: false,
//       }
//     } 
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         switch (routeName) {
//           case 'Sign Out':
//             iconName =
//               Platform.OS === 'ios'
//                 ? `ios-information-circle${focused ? '' : '-outline'}`
//                 : 'md-information-circle';
//             break;
//         }
//         return (
//           <Ionicons
//             name={iconName}
//             size={28}
//             style={{ marginBottom: -3 }}
//             color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
//           />
//         );
//       },
//     }),
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
//     animationEnabled: true,
//     swipeEnabled: true,
//   }
// );



// if (user != null && this.state.role == 'client') {
//   navigate('ClientHomeScreen')
// } elseif(user!=null && this.state.role == 'stylist') {
//     navigate('StylistHomeScreen')
// } else {
//   console.log("Unable to check user and role")
// }
