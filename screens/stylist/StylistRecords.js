import React from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView, TouchableNativeFeedback } from 'react-native';

class StylistRecords extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Job History',
        headerStyle: {
          backgroundColor: '#33FFC1'
        },
        headerTitleStyle: {
          color: '#FFF'
        }
      });

    constructor() {
        super();
        this.onPress = this.onPress.bind(this);
        this.state = {
            records: undefined
        }
    }

    componentDidMount() {
        fetch("https://randomuser.me/api/?results=10").then(x => {
            const results = JSON.parse(x._bodyInit).results;
            this.setState({ records: results });
        });
    }

    onPress(record) {
        this.props.navigation.navigate("Details", {record: record});
    }

    drawContent(record, index) {
        return (
            <TouchableNativeFeedback key={index} onPress={()=> {this.onPress(record)}}>
                <View style={styles.record}>
                    <Image style={styles.image} source={{ uri: record.picture.thumbnail }} />
                    <View>
                        <Text style={styles.recordName}>{record.name.first} {record.name.last}</Text>
                        <Text>C: {record.cell}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.wrapper}>
                    {this.state.records && this.state.records.map((record, index) => {
                        return this.drawContent(record, index)
                    })}
                </ScrollView>
                <Button onPress={() => { }} title="Add record" />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    wrapper: {
        flex: 1,
        marginBottom: 10
    },
    record: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'grey',
        marginBottom: 10
    },
    recordName: {
        fontWeight: '600'
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: 'skyblue',
        marginRight: 10
    }
})

export default StylistRecords;