
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert,TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import SwitchSelector from 'react-native-switch-selector';//for toggle selector
import { connect } from 'react-redux';
import { sendbirdLogin } from '../../actions';

//Used this tutorial for toggle switch https://github.com/App2Sales/react-native-switch-selector


class SignupScreen extends React.Component {

    static navigationOptions = {
        header: null
    }//remove the default header

    constructor(props) {
        super(props);
        this.state = { 
            userId: "test@test.com",
            password: "testtest",
            passwordConfirm: "testtest",
            role: "client",
            nickname: "Test Man",
        };
    }

    componentWillReceiveProps(props) {
        const { user, error } = props;
        if (user) {
            this.setState({ userId: this.state.userId, nickname: this.state.nickname })
        }
    }

    _userIdChanged = (userId) => {
        this.setState({ userId });
    }

    _nicknameChanged = (nickname) => {
        this.setState({ nickname });
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        //code for SendBird connection and user creation
        const { userId, nickname } = this.state;
        this.props.sendbirdLogin({ userId, nickname });

        firebase.auth().createUserWithEmailAndPassword(this.state.userId, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });

        console.log("Just created user");
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged( user => {
    //         if(user){
    //             this.writeUserData(user.uid, user.email, this.state.role, this.state.nickname);
    //         }
    //     })
    // }

    // writeUserData(userID, email, role = this.state.role, name = this.state.nickname){
    //     firebase.database().ref('UsersList/' + userID).set({
    //         email,
    //         role, 
    //         name
    //     }).then((data)=>{
    //         //success callback
    //         console.log('data ' , data)
    //     }).catch((error)=>{
    //         //error callback
    //         console.log('error ' , error)
    //     })
    // }

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "LoginScreen"})]
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
                        value={this.state.nickname}
                        onChangeText={this._nicknameChanged}
                        placeholder="Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput style={styles.textinput}
                        value={this.state.userId}
                        onChangeText={this._userIdChanged}
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

function mapStateToProps({ login }) {
    const { error, user } = login;
    return { error, user };
};

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

export default connect(mapStateToProps, { sendbirdLogin })(SignupScreen);