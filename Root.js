import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

import ClientList from './screens/stylist/ClientList';
import ClientHomeScreen from './screens/client/ClientHome';
import StylistHomeScreen from './screens/stylist/StylistHome';
import StylistRecordScreen from './screens/stylist/StylistRecords';
  
  const ClientStack = StackNavigator(
    {
      ClientHomeScreen: {
        screen: ClientHomeScreen
      }
    },
    {
      initialRouteName: 'ClientHomeScreen',
    }
  );

  const StylistStack = StackNavigator(
    {
      ClientList: {
        screen: ClientList
      },
      StylistHomeScreen: {
        screen: StylistHomeScreen
      },
      StylistRecords: {
        screen: StylistRecordScreen
      },
    },
    {
      initialRouteName: 'StylistHomeScreen',
    }
  );
 

// const MainStack =  StackNavigator(
//   {
//     StylistStack: {
//       screen: StylistStack
//     },
//     ClientStack: {
//         screen: ClientStack
//     },
//   },
//     {
//       initialRouteName: 'StylistStack'
//     },
// );

export default TabNavigator(
  {
    StylistStack: {
      screen: StylistStack
    },
    ClientStack: {
     screen: ClientStack
    },
  },
  { 
    initialRouteName: 'StylistStack'
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = icons[routeName];
        let color = (focused) ? '#fff' : '#929292';

        return <MaterialIcons name={iconName} size={35} color={color} />;
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#333'
      }
    }
  },
);

//export default class RootNavigator extends React.Component {

//   render() {return  <MainStack />}

// }


// {
//   navigationOptions: ({ navigation }) => ({ // the navigation object that's automatically passed via props when using a navigator component
//     tabBarIcon: ({ focused, tintColor }) => { 
//       const { routeName } = navigation.state; // name of the current page
//       let iconName = icons[routeName];
//       let color = (focused) ? '#fff' : '#929292'; // if this page is the one currently viewed, use white as the icon color to indicate that it's active
//       return <MaterialIcons name={iconName} size={35} color={color} />;
//     },
//   }),
//   tabBarPosition: 'bottom', // where to put the tab bar (top or bottom of the screen)
//   animationEnabled: true, // show an animation when navigating between pages. the default is a sliding animation
//   tabBarOptions: {
//     showIcon: true, // show icons you've rendered in the the tabBarIcon
//     showLabel: true, // don't show labels in the tabs
//     style: {
//       backgroundColor: '#ffffff' // the background color of the tab bar
//     }
//   }
// },