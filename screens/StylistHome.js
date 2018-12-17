import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
import SendBird from 'sendbird';
import { Button, Text } from 'native-base';

const onSignoutPress = () => {
  const sb = new SendBird({ 'appId': '0B7E1CDE-5B22-4850-8BC5-4F1B109CFD91' });
  firebase.auth().signOut();
  console.log("StylistHomeScreen Signout pressed")
  //AsyncStorage.clear();

  sb.disconnect(function(){
    // You are disconnected from SendBird.
  });
}

 export default class StylistHome extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Home',
    headerStyle: {
      backgroundColor: '#33FFC1',
      height: 45,
    },
    headerTitleStyle: {
      color: '#6b52ae', 
      fontWeight: 'bold',
      fontSize: 20
    },
    headerRight: (
        <Button hasText transparent onPress={() => onSignoutPress()}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#6b52ae'}}>Sign out</Text>
        </Button>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
        name: "",
        role: "",
        uid: "",
        asyncRole: "",
        bioImage: "",
    };
}

onSignoutPress = () => {
  const sb = new SendBird({ 'appId': '0B7E1CDE-5B22-4850-8BC5-4F1B109CFD91' });
  firebase.auth().signOut();
  console.log("StylistHomeScreen Signout pressed")
  //AsyncStorage.clear();

  sb.disconnect(function(){
    // You are disconnected from SendBird.
  });
}
  componentDidMount() {
    // this.getUserRole();
    // this.checkPersistData();
    console.log("CDM before GBI");
    // this.getBioImage();
  }

  componentWillMount(){
    // this.checkPersistData();
    // this.getUserRole();
      var user = firebase.auth().currentUser;
      if (user != null){
          this.setState({uid: user.uid});
      } else {
          console.log("Unable to locate current user");
      }

      //console.log("Inside method userEmail: " + this.state.userEmail);
      var itemsRef = firebase.database().ref('/UsersList/' + user.uid);
      itemsRef.once('value').then(snapshot => {
        this.setState({ role: snapshot.child("role").val() });
        this.setState({ name: snapshot.child("name").val() });
        this.getBioImage(snapshot.child("name").val());
        //console.log("User Role from DB: " + this.state.role);
      });  

  }

  getBioImage(name) {
    if (name == 'Danielle'){
      this.setState({bioImage: '../assets/images/Danielle.jpg'});
    } else {
      this.setState({bioImage: '../assets/images/Shannon.jpg'});  
    }
 }


  displayRoleOptions() {
    const { navigate } = this.props.navigation;
    if (this.state.role == 'Stylist') {
        return <View style={styles.body}>
        <View style={styles.bodyContent}>
        <View style={styles.menuBox}>
          <TouchableOpacity onPress = {() => {navigate('StylistRecords')}}>
            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/48/000000/combo-chart.png'}}/>
              <Text style={styles.info}>Reports</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.menuBox}>
          <TouchableOpacity onPress = {() => {navigate('ClientList')}}>
            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/48/000000/user-group-man-man.png'}}/>
              <Text style={styles.info}>Clients</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.menuBox}>
          <TouchableOpacity onPress = {() => {navigate('GroupChannel')}}>
            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/icon/63/secured-letter'}}/>
              <Text style={styles.info}>Messages</Text>
            </View>
            </TouchableOpacity>
            </View>
            <View style={styles.menuBox}>
            <TouchableOpacity onPress = {() => {navigate('Profile')}}>
              <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/icon/2952/user-male'}}/>
                <Text style={styles.info}>Profile</Text>
              </View>
            </TouchableOpacity>
            </View>
           <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/48/000000/future-filled.png'}}/>
            <Text style={styles.info}>Stopwatch</Text>
          </View>
           <View style={styles.menuBox}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/48/000000/resume.png'}}/>
            <Text style={styles.info}>Portfolio</Text>
          </View>
         </View>
    </View>;
    } else if(this.state.role == 'Client') {
        return <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View style={styles.menuBox}>
            <TouchableOpacity onPress = {() => {navigate('Profile')}}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/icon/2952/user-male'}}/>
              <Text style={styles.info}>Profile</Text>
            </TouchableOpacity>
          </View>
         
          <View style={styles.menuBox}>
            <TouchableOpacity onPress = {() => {navigate('GroupChannel')}}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/icon/63/secured-letter'}}/>
              <Text style={styles.info}>Messages</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress = {() => {navigate('StyleMemo')}}>
                <View style={styles.menuBox}>
                  <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material/48/000000/multiple-choice.png'}}/>
                  <Text style={styles.info}>StyleMemo</Text>
                </View>
          </TouchableOpacity>

          <View style={styles.menuBox}>
             <TouchableOpacity onPress = {() => {navigate('ImageUpload')}} >
              <Image style={styles.icon} source={{uri:'https://png.icons8.com/icon/5376/camera'}}/>
              <Text style={styles.info}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuBox}>
            <TouchableOpacity >
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/icon/532/news'}}/>
              <Text style={styles.info}>History</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuBox}>
            <TouchableOpacity >
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/icon/3096/menu'}}/>
              <Text style={styles.info}>Services</Text>
            </TouchableOpacity>
          </View>
      </View>
      </View>;
    } else {
      return <Text>Role not read</Text>;
    }
}

   render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={this.state.name === 'Danielle' ? require('../assets/images/Danielle.jpg') : require('../assets/images/Shannon.jpg') }
                  />
                 <Text style={styles.name}>{this.state.name}</Text>
                  <Text style={styles.userInfo}>{this.state.role}</Text>
                {/* <Button title="Sign Out" onPress={onSignoutPress} /> */}
            </View>
          </View>
          <View>{this.displayRoleOptions()}</View>
      </ScrollView>
    );
  }
}
 const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:15,
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
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  bodyContent:{
    paddingTop:5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "white",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
    
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