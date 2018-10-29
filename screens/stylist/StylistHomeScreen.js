import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
 export default class ProfileIconsView extends Component {
   render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                 <Text style={styles.name}>
                  Stylist Name
                </Text>
            </View>
          </View>
           <View style={styles.body}>
            <View style={styles.bodyContent}>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/50/000000/calendar.png'}}/>
                <Text style={styles.info}>Calendar</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/groups.png'}}/>
                <Text style={styles.info}>Clients</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/communication.png'}}/>
                <Text style={styles.info}>Messages</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/delivery-time.png'}}/>
                <Text style={styles.info}>Stopwatch</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/spiral-bound-booklet.png'}}/>
                <Text style={styles.info}>Notes</Text>
              </View>
               <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/linen/50/000000/statistics.png'}}/>
                <Text style={styles.info}>Reports</Text>
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
      </View>
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