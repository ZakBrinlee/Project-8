import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,Button,ScrollView,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import { AsyncStorage } from "react-native"

export default class ClientHome extends React.Component {
   static navigationOptions = {
        header: null
    }//remove the default header

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
                <Text style={styles.name}>StyleMemoTM Page</Text>

              </View>
    
          </ScrollView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      header:{
        backgroundColor: "#33FFC1",
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
        backgroundColor: "white",
        height:310,
       },

    
      bodyContent:{
        paddingTop:20,
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
        fontSize:20,
        color: "#696969",
      }
     
    });