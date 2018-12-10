import React from 'react';
import { createBottomTabNavigator, TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

import ClientList from './screens/stylist/ClientList';
import ClientHomeScreen from './screens/client/ClientHome';
import ClientProfile from './screens/client/ClientUpdateProfile';
import ImageUpload from './screens/client/ImageUploadScreen';
import StylistHomeScreen from './screens/stylist/StylistHome';
import StylistRecordScreen from './screens/stylist/StylistRecords';
import GroupChannel from './screens/GroupChannel';
import GroupChannelInvite from './screens/GroupChannelInvite';
import Chat from './screens/Chat';
  
  const ClientStack = StackNavigator(
    {
      ClientHomeScreen: {
        screen: ClientHomeScreen
      },
      ClientProfile: {
        screen: ClientProfile
      },
      ImageUpload:{
        screen : ImageUpload
      },
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
      GroupChannel: {
        screen: GroupChannel
      },
      GroupChannelInvite: {
        screen: GroupChannelInvite
      },
      Chat: {
        screen: Chat
      },
    },
    {
      initialRouteName: 'StylistHomeScreen',
    }
  );

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
 
//export default StackNavigator(
 // {
   // StylistStack: {
   //   screen: StylistStack
   // },
    //ClientStack: {
    // screen: ClientStack
   // },
  //}//,
  //{ 
    //initialRouteName: 'StylistStack',
    //navigationOptions: ({ navigation }) => ({
     // header: null
   // })
  //}
  //);
  // {
  //   tabBarPosition: "bottom",
  //   animationEnabled: true,
  //   tabBarOptions: {
  //     showIcon: true,
  //     showLabel: true,
  //     style: {
  //       backgroundColor: '#333'
  //     }
  //   },
  //   navigationOptions: ({ navigation }) => ({
  //     header: null,
  //     tabBarIcon: ({ focused, tintColor }) => {
  //       const { routeName } = navigation.state;
  //       let iconName = icons[routeName];
  //       let color = (focused) ? '#fff' : '#929292';

  //       return <MaterialIcons name={iconName} size={35} color={color} />;
  //     },
  //   }),
  //   tabBarPosition: "bottom",    
  // },


