
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import SwitchSelector from 'react-native-switch-selector';//for toggle selector
import ApiKeys from '../../constants/ApiKeys.js';

//Used this tutorial for toggle switch https://github.com/App2Sales/react-native-switch-selector


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
           
           <View style={{paddingTop:50, alignItems:"center"}}>

               <Text>{"Hello " + this.state.userEmail}</Text>
               <Text>{"Your role is " + this.state.role}</Text>

            <Button title="Sign out" onPress={this.onSignoutPress} />
           </View>
       );
   }
}

const styles = StyleSheet.create({

});




