import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {Button, Item, Icon, Label, Input, Form, Content, Container, Picker, Text, Textarea, DatePicker} from 'native-base';
import * as firebase from 'firebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Profile extends Component {
  
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Profile',
    headerStyle: {
      backgroundColor: '#33FFC1',
      textAlign: 'center'
    },
    headerTitleStyle: {
      color: '#6b52ae', 
      fontWeight: 'bold',
      textAlign: 'center'
    },
    headerRight: (
        <Button hasText transparent onPress={() => onSignoutPress()}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#6b52ae'}}>Sign out</Text>
        </Button>
    ),
  });
  
  onSignoutPress = () => {
    const sb = new SendBird({ 'appId': '0B7E1CDE-5B22-4850-8BC5-4F1B109CFD91' });
    firebase.auth().signOut();
      
    sb.disconnect(function(){
      // You are disconnected from SendBird.
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      about: "",
      role: "",
    }
    this.submitProfile = this.submitProfile.bind(this);
  }

  componentWillMount(){
    this.getUserRole();
  }
  
  getUserRole() {
        console.log("Inside getUserRole");
        var user = firebase.auth().currentUser;
        if (user != null){
            this.setState({uid: user.uid});
        } else {
            console.log("Unable to locate current user");
        }

        console.log("Inside method userEmail: " + this.state.userEmail);
        var itemsRef = firebase.database().ref('/UsersList/' + user.uid);
        itemsRef.once('value').then(snapshot => {
          this.setState({ role: snapshot.child("role").val() });
          this.setState({ name: snapshot.child("name").val() });
          this.setState({ about: snapshot.child("about").val() });
          //console.log("User Role from DB: " + this.state.role);
        });         

    }
 
    submitProfile() {
        console.log("Inside SubmitProfile method");        
        const name = this.state.name;
        const role = this.state.role;
        const about = this.state.about;
        const { navigate } = this.props.navigation;

        firebase.database().ref('UsersList/' + this.state.uid).update({
            name,
            role,
            about
        }, function(error) {
          if (error) {
            Alert.alert(
              'Error',
              'Are you sure want to delete chat?',
              [
                  {text: 'OK', onPress: () => {navigate('StylistHome')}},
              ]
          )
          } else {
            // Data saved successfully!
            Alert.alert(
              'Success',
              'Profile information successfully saved',
              [
                  {text: 'OK', onPress: () => {navigate('StylistHome')}},
              ]
          )
            //this.successGoBack;
          }
        });
      
    }

  setName(newName) {
    this.setState({ name: newName });
  }

  setAbout(newAbout) {
    this.setState({ about: newAbout });
  }

  render() {  
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container} >
        <Content>
            <Form>
                 <Item stackedLabel>
                    <Label>Name</Label>
                    <Input 
                        value = {this.state.name}
                        onChangeText={this.setName.bind(this)}
                    />
                </Item>
                <Textarea 
                    rowSpan={5} 
                    bordered placeholder="About" 
                    value={this.state.about}
                    onChangeText={this.setAbout.bind(this)}
                    style={{marginBottom: 25}}
                    />
                <KeyboardSpacer/>
                <Button block onPress={this.submitProfile}>
                    <Text>Save Profile</Text>
                </Button>
            </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  textViewContainer: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 20,
    color: 'black',
    
   },
});
