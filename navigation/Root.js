import { StackNavigator } from 'react-navigation';

import ClientList from '../screens/ClientList';
import ImageUpload from '../screens/ImageUploadScreen';
import StylistHomeScreen from '../screens/StylistHome';
import StylistRecordScreen from '../screens/StylistRecords';
import GroupChannel from '../screens/GroupChannel';
import GroupChannelInvite from '../screens/GroupChannelInvite';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import StylistRecordsAdd from '../screens/StylistRecordsAdd';
import StyleMemo from '../screens/StyleMemo';
  
   export default StackNavigator(
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
    StylistRecordsAdd: {
      screen: StylistRecordsAdd
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
    Profile: {
      screen:Profile
    },
    ImageUpload:{
      screen : ImageUpload
    },
    StyleMemo:{
      screen : StyleMemo
    },
    ImageUpload:{
      screen : ImageUpload
    },
  },
  { 
    initialRouteName: 'StylistHomeScreen',
    navigationOptions: ({ navigation }) => ({
      
    })
  }
  );
 
