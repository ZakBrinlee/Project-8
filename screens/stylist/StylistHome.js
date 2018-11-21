import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import RootStackNavigator from '../../navigation/RootNavigation';
import SendBird from 'sendbird';


 export default class StylistHome extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Stylist Home',
    headerStyle: {
      backgroundColor: '#33FFC1'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  });


  onSignoutPress = () => {
    const sb = new SendBird({ 'appId': '0B7E1CDE-5B22-4850-8BC5-4F1B109CFD91' });
    firebase.auth().signOut();
    console.log("StylistHomeScreen Signout pressed")
    //AsyncStorage.clear();

    sb.disconnect(function(){
      // You are disconnected from SendBird.
    });
  }

  

   render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                 <Text style={styles.name}>
                  Stylist Name
                </Text>
                <Button title="Sign Out" onPress={this.onSignoutPress} />
            </View>
          </View>
           <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity onPress = {() => {navigate('StylistRecords')}}>
                <View style={styles.menuBox}>
                  <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/statistics.png'}}/>
                  <Text style={styles.info}>Reports</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => {navigate('ClientList')}}>
                <View style={styles.menuBox}>
                  <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/groups.png'}}/>
                  <Text style={styles.info}>Clients</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => {navigate('StylistChat')}}>
                <View style={styles.menuBox}>
                  <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/communication.png'}}/>
                  <Text style={styles.info}>Messages</Text>
                </View>
                </TouchableOpacity>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/delivery-time.png'}}/>
                <Text style={styles.info}>Stopwatch</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/spiral-bound-booklet.png'}}/>
                <Text style={styles.info}>Notes</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/paypal.png'}}/>
                <Text style={styles.info}>Payment</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/stack-of-photos.png'}}/>
                <Text style={styles.info}>Portfolio</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/user-settings.png'}}/>
                <Text style={styles.info}>Settings</Text>
              </View>
             </View>
        </View>
      </ScrollView>
    );
  }
}
 const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:16,
    color: "#696969",
  }
});