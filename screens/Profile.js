import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { initProfile, getCurrentUserInfo, updateProfile } from '../actions'
import { Avatar, Icon } from '../components';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Profile',
            headerStyle: {
                backgroundColor: '#33FFC1',
                textAlign: 'center'
              },
              headerTitleStyle: {
                color: '#6b52ae', 
                fontWeight: 'bold',
              },
            headerRight: (
                <Icon
                    name='md-checkmark-circle'
                    type='ionicon'
                    color='#6b52ae'
                    containerStyle={{ marginRight: 20 }}
                    size={25}
                    onPress={ () => { params.handleSave() } }                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            profileUrl: '',
            nickname: ''
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this._onSaveButtonPress })
        this.props.initProfile();
        this.setState({ isLoading: true }, () => {
            this.props.getCurrentUserInfo();
        });
    }

    componentWillReceiveProps(props) {
        const { userInfo, isSaved } = props;
        if (userInfo) {
            const { profileUrl, nickname } = userInfo;
            const isLoading = false;
            this.setState({ profileUrl, nickname, isLoading });
        }
        if (isSaved) {
            this.props.navigation.goBack();
        }
    }

    _onNicknameChanged = (nickname) => {
        this.setState({ nickname });
    }

    _onSaveButtonPress = () => {
        this.props.updateProfile(this.state.nickname);
    }

    render() {
        console.log("Inside Profile Render");
        return (
            <View style={styles.containerStyle}>
                {/* <Spinner visible={this.state.isLoading} /> */}
                <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 50, marginBottom: 50}}>
                <Text>Something</Text>
                    <Avatar 
                        large
                        rounded
                        source={this.state.profileUrl ? {uri: this.state.profileUrl} : require('../assets/images/robot-dev.png')}
                    />
                </View>

                <Text>Nickname</Text>
                <TextInput 
                    style={styles.defaultMargin}
                    selectionColor = { '#000' }
                    inputStyle={{color: '#000'}}
                    value={this.state.nickname}
                    maxLength={12}
                    onChangeText={this._onNicknameChanged} 
                />
                <Text style={{marginLeft: 14}}>{this.props.error}</Text>

                {/* <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                    Nickname
                </FormLabel>
                <FormInput 
                    containerStyle={styles.defaultMargin}
                    selectionColor = { '#000' }
                    inputStyle={{color: '#000'}}
                    value={this.state.nickname}
                    maxLength={12}
                    onChangeText={this._onNicknameChanged} 
                />
                <FormValidationMessage labelStyle={{marginLeft: 14}}>
                    {this.props.error}
                </FormValidationMessage> */}
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#fff', 
        flex: 1
    },
    defaultMargin: {
        marginLeft: 14, 
        marginRight: 14
    }
};

function mapStateToProps({ profile }) {
    const { userInfo, error, isSaved } = profile;
    return { userInfo, error, isSaved };
};

export default connect(
    mapStateToProps, 
    { initProfile, getCurrentUserInfo, updateProfile }
)(Profile);
