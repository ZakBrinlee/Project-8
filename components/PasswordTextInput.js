import React from 'react';
import { TextInput } from 'react-native';

class PasswordTextInput extends React.Component {

    render() {
        return <TextInput {...this.props}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
        />;
    }

}

export { PasswordTextInput };