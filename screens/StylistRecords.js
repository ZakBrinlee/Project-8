import React, { Component } from 'react';
import { StyleSheet, ListView, Text } from 'react-native';
import {Button, Icon, Content, Container, List, ListItem, Left, Body, Right, Thumbnail} from 'native-base';
import * as firebase from 'firebase';

const data = [];
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
      <Icon
      ios='ios-add' 
      android="md-add"
      onPress={() => navigation.navigate('StylistRecordsAdd')}
      style={{fontSize: 30, color: '#6b52ae', marginRight: 20}}
      />
    ),
  });
  
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: data, 
      uid: "",
    }
  }


  componentWillMount(){
    this.getUserRole();
  }

  getUserRole() {

    var that = this
    //console.log("Inside getUserRole");
    var user = firebase.auth().currentUser;
    if (user != null){
        this.setState({uid: user.uid});
    } else {
        console.log("Unable to locate current user");
    }

    //console.log("Inside method userEmail: " + this.state.userEmail);
    var itemsRef = firebase.database().ref('/UsersList/' + user.uid + "/StyleRecords");
    itemsRef.on('child_added', function(data) {

      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData })
    });
  
}

async deleteRow(secId, rowId, rowMap, data) {

  console.log("inside Delete: " + data.key);
  await firebase.database().ref('/UsersList/' + this.state.uid + "/StyleRecords/" + data.key).remove();

  rowMap[`${secId}${rowId}`].props.closeRow();
  var newData = [...this.state.listViewData];
  newData.splice(rowId, 1)
  this.setState({ listViewData: newData });

}

  render() {   
    // console.log("Jobs: " + this.state.listViewData)
    return (
      <Container style={styles.container} >
        <Content>
          <List 
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={ data =>
             <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/images/Danielle.jpg')} />
              </Left>
              <Body>
                <Text>{data.val().customer}</Text>
                <Text>Date: {data.val().chosenDate.substr(4, 12)}</Text>
                <Text note>Note: {data.val().note}</Text>
              </Body>
              <Right>
                <Text note>${data.val().amount}</Text>
                <Text note>Time: {data.val().time}/hrs</Text>
              </Right>
            </ListItem>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name="trash" />
              </Button>
            }
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