
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {

     static navigationOptions = {
        header: null
    }//remove the default header

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
             <View style={styles.container}>

                <View style={styles.imageBox}>
                    <Image
                        style={styles.lock}
                        source={require('./lock.jpg')}
                    />
                    <Text style={styles.textPswd}>Forgot your password?</Text>
                    
                     <Text style={styles.text2}>Enter your Email address below.</Text>
                </View>


                <View style={styles. inputBox}>
                   
                     <TextInput style={styles.textInput}
                        value={this.state.email}
                        onChangeText={(text) => { this.setState({email: text}) }}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.bottonBox}>
                    <TouchableOpacity style={styles.botton} onPress={this.onResetPasswordPress}>
                        <Text style={styles.bottonText}>Reset Password</Text>
                        
                    </TouchableOpacity>{/*End of botton1*/}
                </View> 

               
                <View style={styles.bottonBox}>
                    <TouchableOpacity style={styles.botton} onPress={this.onBackToLoginPress}>
                        <Text style={styles.bottonText}>Back to Login</Text>
                        
                    </TouchableOpacity>{/*End of botton2*/}
                </View> 

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },

    imageBox:{
        flex:0.6,
        backgroundColor:'white',
        alignItems:'center',
    },

    lock:{
        marginTop:80,
        width:200,
        height:200,
    },

    textPswd:{
        marginTop:10,
        fontSize:28,
        fontWeight:'600',
        color:'gray',
    },

    text2:{
        paddingTop:20,
        color:'gray',
    },

    inputBox:{
        flex:0.1,
        alignItems:"center",
        backgroundColor:'white',
    },

    textInput:{
        paddingTop:10,
        width: 250, 
        height: 50, 
        borderWidth: 0,

    },

    bottonBox:{
        flex:0.1,
        alignItems:'center',
    },

    botton:{
        width:180,
        height:40,
        backgroundColor: '#D6FAEA',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        
   },
   
   buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});