import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {Button, Item, Icon, Label, Input, Form, Content, Container, Picker, Text, Textarea, DatePicker} from 'native-base';
import * as firebase from 'firebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class StylistRecordsAdd extends Component {
  
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Add Style Record',
    headerStyle: {
      backgroundColor: '#33FFC1',
      textAlign: 'center'
    },
    headerTitleStyle: {
      color: '#6b52ae', 
      fontWeight: 'bold',
      textAlign: 'center'
    }
  });
  
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      customer: undefined,
      chosenDate: new Date(),
      note: '',
      time: '',
      amount: ''
    }
    this.submitRecord = this.submitRecord.bind(this);
    this.setDate = this.setDate.bind(this);
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

        //console.log("Inside method userEmail: " + this.state.userEmail);
        // var itemsRef = firebase.database().ref('/UsersList/' + user.uid);
        // itemsRef.once('value').then(snapshot => {
        //   this.setState({ role: snapshot.child("role").val() });
        //   this.setState({ name: snapshot.child("name").val() });
        //   //console.log("User Role from DB: " + this.state.role);
        // });         

    }
 
    submitRecord() {
        const customer = this.state.customer;
        const chosenDate = this.state.chosenDate;
        const time = this.state.time;
        const amount = this.state.amount;
        const note = this.state.note;

        firebase.database().ref('UsersList/' + this.state.uid + '/StyleRecords').set({
            customer,
            chosenDate, 
            time,
            amount, 
            note
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
            navigation.navigate('StylistRecords')
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }

  onValueChange2(value) {
    this.setState({
      customer: value
    });
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  setTime(newTime) {
    this.setState({ time: newTime });
  }

  setAmount(newAmount) {
    this.setState({ amount: newAmount });
  }

  setNote(newNote) {
    this.setState({ note: newNote });
  }

  render() {  
    return (
      <Container style={styles.container} >
        <Content>
            <Form>
                <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined }}
                    placeholder="Select client"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.customer}
                    onValueChange={this.onValueChange2.bind(this)}
                >
                    <Picker.Item label="Danielle" value="Danielle" />
                </Picker>
                </Item>
                <DatePicker
                    defaultDate={new Date(2018, 12, 11)}
                    minimumDate={new Date(2017, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                />
                <Text>
                    Date: {this.state.chosenDate.toString().substr(4, 12)}
                </Text>
                 <Item stackedLabel>
                    <Label>Time</Label>
                    <Input 
                        onChangeText={this.setTime.bind(this)}
                    />
                </Item>
                <Item stackedLabel last>
                    <Label>Amount $</Label>
                    <Input 
                        onChangeText={this.setAmount.bind(this)}
                    />
                </Item>
                <Textarea 
                    rowSpan={5} 
                    bordered placeholder="Notes" 
                    onChangeText={this.setNote.bind(this)}
                    />
                <Button block onPress={this.submitRecord}>
                    <Text>Add Style Record</Text>
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
