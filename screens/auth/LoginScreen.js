
import React from 'react';
import { Platform,StyleSheet, View, Text, TextInput, Button, Alert,Image,TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    // static navigationOptions = ({navigation}) => ({
    //     headerTitle: 'Login',
    //     headerStyle: {
    //       backgroundColor: '#333'
    //     },
    //     headerTitleStyle: {
    //       color: '#FFF'
    //     }
    //   });

    constructor(props) {
        super(props);
        this.state = { 
            email: "test@test.com",
            password: "testtest",
        };
        this.renderItem = this.renderItem.bind(this);
    }

    

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "SignupScreen"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    onForgotPasswordPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "ForgotPasswordScreen"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    renderItem = ({item}) => {
        const { navigate } = this.props.navigation;
        return (
          <TouchableHighlight key={item.key} underlayColor="#ccc" onPress={() => {
            navigate('Signup');
          }} style={styles.list_item}>
            <Text key={item.key}>{item.name}</Text>
          </TouchableHighlight>
        );
      }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.box1}>
                    
                    <Image
                        style={styles.logo}
                        source={require('./logo.png')}
                    />
                    <Text style={styles.welcome}>WELCOME TO PRIVYD</Text>
                </View>

                <View style={styles.box2}>
                    <Text style={styles.box2_text1}>A Space to Create</Text>
                    <Text style={styles.box2_text2}>&</Text>
                    <Text style={styles.box2_text3}>Visualize Style</Text>
                </View>
            
                <View style={styles.loginbox}>

                    <Text style={styles.login}>Login</Text> 

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
                </View>
                
                <View style={styles.loginbt}>
                    <TouchableOpacity style={styles.botton} onPress={this.onLoginPress}>
                        <Text style={styles.bottonText}>Login</Text>
                        
                    </TouchableOpacity>
                </View> 
               
                <View style={styles.loginbt}>
                    <TouchableOpacity style={styles.botton} onPress={this.onCreateAccountPress}>
                        <Text style={styles.bottonText}>Sign Up</Text>
                        
                    </TouchableOpacity>
                </View> 
                
                    
                <View style={styles.loginbt}>
                    <TouchableOpacity style={styles.botton}  onPress={this.onForgotPasswordPress}>
                        <Text style={styles.bottonText}>Forgot Password</Text>
                        
                    </TouchableOpacity>
                </View> 
                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        paddingTop:6,
        backgroundColor: 'white',
        flex:1,
        
    },

    box1:{
        flex:0.25,
        backgroundColor:'white',
    },

    logo:{
        width:85,
        height:87,
    },

    welcome:{
        color:'#B8AA64',
        fontSize:28,
        fontWeight:'600',
        textAlign:'right',
        paddingRight:5,
        
    },

    box2:{
        flex:0.35,
        backgroundColor:'#33FFC1',
    },

    box2_text1:{
        padding:5,
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

    loginbox:{
        flex:0.25,
        paddingTop:15, 
        alignItems:"center",
    },

    login:{
        fontSize:20,
        fontWeight:'bold',
        color:'gray',
    },

    textinput:{
        width: 250, 
        height: 50, 
        borderWidth: 0,
    },

   loginbt:{
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







