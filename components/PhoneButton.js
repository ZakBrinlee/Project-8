import React from 'react';
import { Button, Linking } from 'react-native';

class PhoneButton extends React.Component {

    onPress = () => {
        var url = "tel:" + this.props.title;
        Linking.openURL(url);
    }

    render() {
        return <Button {...this.props}
            onPress={this.onPress}
        />
    }

}

export { PhoneButton };