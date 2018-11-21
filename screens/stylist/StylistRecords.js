import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Record = t.struct({
  date: t.String,
  client: t.String,
  time: t.String,
  amount: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    date: {
      error: 'Please enter the date of the client appointment'
    },
    client: {
      error: 'Please provide a client for this job'
    },
  },
  stylesheet: formStyles,
};

export default class StylistRecords extends Component {
  
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Job History',
    headerStyle: {
      backgroundColor: '#33FFC1'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  });
  
    handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={Record} 
          options={options}
        />
        <Button
          title="Add Job"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});