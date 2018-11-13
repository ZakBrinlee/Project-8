
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,Button,ScrollView} from 'react-native';
import * as firebase from 'firebase';
import { AsyncStorage } from "react-native"

export default class ClientHome extends React.Component {
  
   constructor(props) {
       super(props);
       this.state = {
           userEmail: "",
           role: "",
           uid: "",
           asyncRole: "",
       };
   }

   componentDidMount() {
      this.getUserRole();
      this.checkPersistData();
    }

    componentWillMount(){
      this.checkPersistData();
    }

    getUserRole() {
        //console.log("Inside getUserRole");
        var user = firebase.auth().currentUser;
        if (user != null){
            this.setState({uid: user.uid});
            this.setState({userEmail: user.email});
        } else {
            console.log("Unable to locate current user");
        }

        //console.log("Inside method userEmail: " + this.state.userEmail);
        var itemsRef = firebase.database().ref('/UsersList/' + user.uid);
        itemsRef.once('value').then(snapshot => {
          this.setState({ role: snapshot.child("role").val() });
          //console.log("User Role from DB: " + this.state.role);
        });         

    }

    checkPersistData(){
      console.log("Inside checkPersistData")
      AsyncStorage.getItem('userRole').then((userRole)=>{
        this.setState({asyncRole: userRole })
      })
      console.log("asyncRole: " + this.state.asyncRole)
    }

    onSignoutPress = () => {
        firebase.auth().signOut();
        AsyncStorage.clear();
      }

      render() {
        return (
          <ScrollView style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                      source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
    
                    <Text style={styles.name}>Client</Text>
                    <Text style={styles.userInfo}>{this.state.userEmail}</Text>
                    <Text style={styles.userInfo}>From DB Role: {this.state.role}</Text>
                    <Text style={styles.userInfo}>From ASYNC Role: {this.state.asyncRole}</Text>
                    
                </View>
              </View>
    
              <View style={styles.body}>
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Home</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/settings/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Settings</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>News</Text>
                  </View>
                </View>
    
                <View style={styles.item} onPress={this.onSignoutPress}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Something</Text>
                  </View>
                </View>
            
            <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/windows/50/ffffff/icons8-male-user-50'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Update Profile</Text>
                  </View>
                </View>
            
                <Button title="Sign Out" onPress={this.onSignoutPress} />
              </View>
          </ScrollView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      header:{
        backgroundColor: "#DCDCDC",
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
        color:"#000000",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
      },
      item:{
        flexDirection : 'row',
      },
      infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
      },
      iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
      },
      icon:{
        width:30,
        height:30,
        marginTop:20,
      },
      info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
      }
    });




