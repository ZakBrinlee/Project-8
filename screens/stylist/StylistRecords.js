import React, { Component } from 'react';
import { View, StyleSheet, ListView, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import {Button, Item, Icon, Label, Input, Form, Content, Container, List, ListItem} from 'native-base';
import * as firebase from 'firebase';

var data = ["Zak", "Rich"];

export default class StylistRecords extends Component {
  
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Style History',
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
      <Button onPress={() => navigation.navigate('StylistRecordsAdd')}>
        <Icon name='add' />
      </Button>
  )
  });
  
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: data, 
      job: "",
      uid: "",
    }
  }

  getUserRole() {
    //console.log("Inside getUserRole");
    var user = firebase.auth().currentUser;
    if (user != null){
        this.setState({uid: user.uid});
    } else {
        console.log("Unable to locate current user");
    }

    //console.log("Inside method userEmail: " + this.state.userEmail);
    var itemsRef = firebase.database().ref('/UsersList/' + user.uid);
    itemsRef.once('value').then(snapshot => {
      this.setState({ role: snapshot.child("role").val() });
      this.setState({ name: snapshot.child("name").val() });
      //console.log("User Role from DB: " + this.state.role);
    });         

}

  renderSeparator = () => {
    return (<Divider style={{ backgroundColor: '#6b52ae', height: 3 }} />);
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };
 

  addRow(){

  }

  deleteRow(){

  }

  showInformation(){

  }

  render() {   
    return (
      <Container style={styles.container} >
        <Content>
          <List 
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={ data =>
              <ListItem>
                <Text>{data}</Text>
              </ListItem>
            }
            renderLeftHiddenRow={data=>
              <Button full>
                <Icon name="information-circle"/>
              </Button>
            }
            renderRightHiddenRow={data=>
              <Button full danger>
                <Icon name="trash"/>
              </Button>
            }

            leftOpenValue={-75}
            rightOpenValue={-75}
          />

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

//<View style={styles.container}></View>
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderSeparator= {this.renderSeparator}
      //     renderRow={(rowData) =>
      //     <View style={{flex:1, flexDirection: 'column'}} >
      //       <TouchableOpacity onPress={console.log("Pressed listItem")} >
      //         <Text style={styles.textViewContainer} >{'Customer: ' + rowData.customer}</Text>
      //         <Text style={styles.textViewContainer} >{'Date: ' + rowData.date}</Text>
      //         <Text style={styles.textViewContainer} >{'Amount: ' + rowData.amount}</Text>
      //         <Text style={styles.textViewContainer} >{'Time: ' + rowData.time + " Hours"}</Text>
      //         <Text style={styles.textViewContainer} >{'Notes: ' + rowData.notes}</Text>
      //       </TouchableOpacity>
      //     </View>
      //     }
      //   />
      // </View>