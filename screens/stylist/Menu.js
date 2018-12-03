import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { sendbirdLogout, initMenu } from '../../actions';
//import { HR } from '../../components';

class Menu extends React.Component {
    static navigationOptions = {
        title: 'MENU'
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    componentWillMount() {
        value = this.props.initMenu();
        console.log("Menu - Inside componentWillMount initMenu(): " + value);
    }

    componentWillReceiveProps(props) {
        const { isDisconnected } = props;
        console.log("Menu - Inside willrecieve isDisconnected: " + isDisconnected);

        if (isDisconnected) {
            this.setState({ isLoading: false }, () => {
                this.props.navigation.dispatch(resetAction);
            })
        }
    }

    _onGroupChannelPress = () => {
        this.props.navigation.navigate('GroupChannel');
    }

    _onDisconnectButtonPress = () => {
        this.setState({isLoading : true});
        this.props.sendbirdLogout();
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
            
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'users', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='Group Channel' 
                    onPress={this._onGroupChannelPress}
                />
                
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#7d62d9'
                    color='#6e5baa'
                    icon={{name: 'sign-out', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='Disconnect' 
                    onPress={this._onDisconnectButtonPress}
                />
                
            </View>
        )
    }
}

const styles = {
    containerViewStyle: {
        backgroundColor: '#fff', 
        flex: 1
    },
    menuViewStyle: {
        marginLeft: 0,
        marginRight: 0
    },
    buttonStyle: {
        justifyContent: 'flex-start',
        paddingLeft: 14
    }
};

function mapStateToProps({ menu }) {
    console.log("Menu - Inside mapStateProps menu: " + menu);
    const { isDisconnected } = menu;
    return { isDisconnected };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu })(Menu);