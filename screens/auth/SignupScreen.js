
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import SwitchSelector from 'react-native-switch-selector';//for toggle selector
import ApiKeys from '../../constants/ApiKeys.js';

//Used this tutorial for toggle switch https://github.com/App2Sales/react-native-switch-selector


export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            passwordConfirm: "",
            role: "client",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });

        this.writeUserData(this.state.email, this.state.role);
        // firebase.database().ref('UsersList/').push({
        //     this.state.email,
        //     this.state.role
        // }).then((data)=>{
        //     //success callback
        //     console.log('data ' , data)
        // }).catch((error)=>{
        //     //error callback
        //     console.log('error ' , error)
        // })
        
    }

    writeUserData(email = this.state.email, role = this.state.role){
        firebase.database().ref('UsersList/').push({
            email,
            role
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    };

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Signup</Text>

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                
                <View style={{paddingTop:30}} />
        
                <SwitchSelector
                    initial={0}
                    onPress={value => this.setState({ role: value })}
                    textColor={'#1a1a1a'} //'#7a44cf'
                    selectedColor={'#1a1a1a'}
                    buttonColor={'#99ffcc'}
                    borderColor={'#cc99ff'}
                    fontSize={20}
                    options={options}

                   />

                <Button title="Signup" onPress={this.onSignupPress} />

                <Button title="Back to Login" onPress={this.onBackToLoginPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

//toggle
const options = [
    { label: 'Client', value: 'client' },
    { label: 'Stylist', value: 'stylist' }
];

