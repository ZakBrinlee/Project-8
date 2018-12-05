import React, { Component } from 'react';
import { View, StyleSheet, ListView, Text, TouchableOpacity } from 'react-native';
import data from '../../jobData.json';
import { Divider } from 'react-native-elements';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class StylistRecords extends Component {
  
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Job History',
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
      dataSource: ds.cloneWithRows([]),
      jobs: data
    }
  }

  componentDidMount() {
    this.data = data;
    this.setState({jobs: this.data});
    this.setState({ dataSource: ds.cloneWithRows(this.data) });
    console.log("jobs state: " + this.state.jobs);
  }

  renderSeparator = () => {
    return (<Divider style={{ backgroundColor: '#6b52ae', height: 3 }} />);
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };
 

  render() {   
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator= {this.renderSeparator}
          renderRow={(rowData) =>
          <View style={{flex:1, flexDirection: 'column'}} >
            <TouchableOpacity onPress={console.log("Pressed listItem")} >
              <Text style={styles.textViewContainer} >{'Customer: ' + rowData.customer}</Text>
              <Text style={styles.textViewContainer} >{'Date: ' + rowData.date}</Text>
              <Text style={styles.textViewContainer} >{'Amount: ' + rowData.amount}</Text>
              <Text style={styles.textViewContainer} >{'Time: ' + rowData.time + " Hours"}</Text>
              <Text style={styles.textViewContainer} >{'Notes: ' + rowData.notes}</Text>
            </TouchableOpacity>
          </View>
          }
        />
      </View>
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