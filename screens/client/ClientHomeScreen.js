
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,} from 'react-native';
import * as firebase from 'firebase';

export default class ClientHomeScreen extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           userEmail: "",
           role: "",
       };
   }

   componentDidMount() {
        this.getUserRole();
        console.log("Just called getUserRole");
    }

    getUserRole() {
        console.log("Inside getUserRole");
        var user = firebase.auth().currentUser;
        
        if (user != null){
            this.setState({userEmail: user.email});
        } else {
            console.log("Unable to locate current user");
        }
        console.log("Inside method userEmail: " + this.state.userEmail);
        // var itemsRef = firebase.database().ref('/UsersList/');
        // itemsRef.orderByChild('email').equalTo(this.state.userEmail).on('value', (snapshot) => {
        // let data = snapshot.val();
        // console.log(data);
        // }); 
    }
    
    onSignoutPress = () => {
        firebase.auth().signOut();
      }


      render() {
        return (
          <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                      source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
    
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.userInfo}>{this.state.userEmail}</Text>
                    <Text style={styles.userInfo}>Washington</Text>
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
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Shop</Text>
                  </View>
                </View>
    
              </View>
          </View>
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




