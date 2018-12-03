import React from 'react';
import { View } from 'react-native';

class HR extends React.Component {
    render() {
        return (
            <View style={[styles.lineStyle, this.props.lineStyle]}></View>
        )
    }
}

const styles = {
    lineStyle: {
        flexDirection: 'row', 
        alignItems: 'center', 
        height: 1,
        backgroundColor: '#e6e6e6'
    }
};

export { HR };