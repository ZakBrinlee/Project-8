
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert,TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import SwitchSelector from 'react-native-switch-selector';//for toggle selector
import ApiKeys from '../../constants/ApiKeys.js';

//Used this tutorial for toggle switch https://github.com/App2Sales/react-native-switch-selector


export default class SignupScreen extends React.Component {

    static navigationOptions = {
        header: null
    }//remove the default header

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
            <View style={styles.container}>

                <View style={styles.box2}>
                     <Text style={styles.box2_text1}>PASSION FOR STYLE</Text>
                    <Text style={styles.box2_text2}>&</Text>
                    <Text style={styles.box2_text3}>LIFE-LONG CLIENTS.</Text>
                </View>
                
                <View style={styles.signUpbox}>
                    <Text style={styles.signUp}>Signup</Text>


                    <TextInput style={styles.textinput}
                        value={this.state.email}
                        onChangeText={(text) => { this.setState({email: text}) }}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    
                    <TextInput style={styles.textinput}
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({password: text}) }}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                

                
                    <TextInput style={styles.textinput}
                        value={this.state.passwordConfirm}
                        onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                        placeholder="Password (confirm)"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>{/*end of signUp input*/}
                
                <View style={styles.switch}>
                    <SwitchSelector
                        initial={0}
                        onPress={value => this.setState({ role: value })}
                        textColor={'#1a1a1a'}
                        selectedColor={'#1a1a1a'}
                        buttonColor={'#99ffcc'}
                        borderColor={'#cc99ff'}
                        fontSize={20}
                        options={options}
                    />
                </View>{/*End of switch*/}

                
                <View style={styles.signupbt}>
                    <TouchableOpacity style={styles.botton} onPress={this.onSignupPress}>
                        <Text style={styles.bottonText}>SignUp</Text>
                        
                    </TouchableOpacity>{/*End of botton1*/}
                </View> 

               
                <View style={styles.signupbt}>
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
        backgroundColor: 'white',
        flex:1,
        
    },

     box2:{
        
        flex:0.45,
        backgroundColor:'#33FFC1',
    },
    box2_text1:{
        padding:3,
        color:'white',
        fontSize:35,
        fontWeight:'600',
        
    },
    box2_text2:{
        padding:5,
        color:'white',
        fontSize:38,
        fontWeight:'600',
        textAlign:'center',
       
    },
    box2_text3:{
        padding:5,
        color:'white',
        fontSize:35,
        fontWeight:'600',
        textAlign:'right',
        
    },

    signUpbox:{
        marginTop:10,
        alignItems:'center',
    },

    signUp:{
        
        fontSize:20,
        fontWeight:'bold',
        color:'gray',
    },

    textinput:{
        width: 250, 
        height: 50, 
        borderWidth: 0,
    },

    switch:{
        marginTop:30,
        flex:0.2,
    },

    signupbt:{
        flex:0.2,
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

//toggle
const options = [
    { label: 'Client', value: 'client' },
    { label: 'Stylist', value: 'stylist' }
];

