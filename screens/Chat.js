import React, { Component } from "react";
import { Platform, View, FlatList, Text, Alert, AsyncStorage, BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import Permissions from 'react-native-permissions';
import { connect } from "react-redux";
import {
  groupChannelProgress,
  initChatScreen,
  getChannelTitle,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  onUserBlockPress,
  onFileButtonPress,
  typingStart,
  typingEnd,
  channelExit
} from "../actions";
import {
  Button,
  TextItem,
  FileItem,
  ImageItem,
  Message,
  AdminMessage } from "../components";

import { 
  sbGetGroupChannel, 
  sbGetOpenChannel, 
  sbCreatePreviousMessageListQuery, 
  sbAdjustMessageList, 
  sbIsImageMessage, 
  sbMarkAsRead } from "../sendbirdActions";
import { MessageInput } from '../components/MessageInput';
import { ImagePicker } from 'expo';
import KeyboardSpacer from 'react-native-keyboard-spacer';


class Chat extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    var title = params.title.split(",");
    return {
      title: `${title[0]}`,
      headerStyle: {
        backgroundColor: '#33FFC1',
        textAlign: 'center'
      },
      headerTitleStyle: {
        color: '#6b52ae',
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props);
    this.flatList = null;
    this.state = {
      channel: null,
      isLoading: false,
      previousMessageListQuery: null,
      textMessage: ""
    };
  }

  componentDidMount() {
    this.props.initChatScreen();
    this.props.navigation.setParams({ handleHeaderLeft: this._onBackButtonPress });
    const { channelUrl, isOpenChannel, isFromPayload } = this.props.navigation.state.params;
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl).then(channel => this.setState({ channel }, () => this._componentInit()));
    } else {
      sbGetGroupChannel(channelUrl).then(channel => this.setState({ channel }, () => this._componentInit()));
    }

    BackHandler.addEventListener('hardwareBackPress', this._onBackButtonPress);
    if (isFromPayload) {
      AsyncStorage.removeItem("payload", () => {});
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackButtonPress);
  }

  _componentInit = () => {
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    this.props.groupChannelProgress(false);
    this.props.getChannelTitle(channelUrl, isOpenChannel);
    this.props.createChatHandler(channelUrl, isOpenChannel);
    this._getMessageList(true);
    if (!isOpenChannel) {
      sbMarkAsRead({ channelUrl });
    }
  };

  componentDidUpdate() {
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    if (!isOpenChannel) {
      this.state.textMessage ? this.props.typingStart(channelUrl) : this.props.typingEnd(channelUrl);
    }
  }

  _onBackButtonPress = () => {
    const { channelUrl, isOpenChannel, _initListState } = this.props.navigation.state.params;
    if (_initListState) _initListState();
    this.setState({ isLoading: true }, () => {
      this.props.channelExit(channelUrl, isOpenChannel);
    });
    return true;
  };

  componentWillReceiveProps(props) {
    const { title, memberCount, list, exit } = props;
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;

    if (memberCount !== this.props.memberCount || title !== this.props.title) {
      const setParamsAction = NavigationActions.setParams({
        params: { memberCount, title },
        key: this.props.navigation.state.key
      });
      this.props.navigation.dispatch(setParamsAction);
    }

    if (list !== this.props.list) {
      this.setState({ isLoading: false });
    }

    if (exit) {
      this.setState({ isLoading: false }, () => {
        this.props.navigation.goBack();
      });
    }
  }

  _onTextMessageChanged = textMessage => {
    this.setState({ textMessage });
  };

  _onUserBlockPress = userId => {
    Alert.alert("User Block", "Are you sure want to block user?", [{ text: "Cancel" }, { text: "OK", onPress: () => this.props.onUserBlockPress(userId) }]);
  };

  _getMessageList = init => {
    if (!this.state.previousMessageListQuery && !init) {
      return;
    }
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    this.setState({ isLoading: true }, () => {
      if (init) {
        sbCreatePreviousMessageListQuery(channelUrl, isOpenChannel)
          .then(previousMessageListQuery => {
            this.setState({ previousMessageListQuery }, () => {
              this.props.getPrevMessageList(this.state.previousMessageListQuery);
            });
          })
          .catch(error => this.props.navigation.goBack());
      } else {
        this.props.getPrevMessageList(this.state.previousMessageListQuery);
      }
    });
  };

  _onSendButtonPress = () => {
    if (this.state.textMessage) {
      const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
      const { textMessage } = this.state;
      this.setState({ textMessage: "" }, () => {
        this.props.onSendButtonPress(channelUrl, isOpenChannel, textMessage);
        if(this.props && this.props.list && this.props.list.length > 0) {
          this.flatList.scrollToIndex({
            index: 0,
            viewOffset: 0
          });
        }
      });
    }
  };

  _onPhotoAddPress = (result) => {
    console.log("onPhotoAddPress selected");
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    Permissions.checkMultiple([ 'photo' ]).then(response => {
      console.log("onPhotoAddPress inside permissions");
      console.log("response: " + response.photo);
      if(response.photo === 'authorized') {
        console.log("onPhotoAddPress inside response.photo authorized");

        let results = result;

        console.log("photo: " + results);

        if (!results.cancelled) {
          console.log("result.cancelled not true");
          let source = { uri: results.uri };
          console.log("source: " + source);
          console.log("uri: " + results.uri);
          if (!result.name) {
            source["name"] = results.fileName;
            console.log("source: " + source["name"]);
          } else {
            paths = results.uri.split("/");
            source["name"] = paths[paths.length - 1];
          }
          if (result.type) {
            source["type"] = response.type;
          } else {
            /** For react-native-image-picker library doesn't return type in iOS,
             *  it is necessary to force the type to be an image/jpeg (or whatever you're intended to be).
            */
            if (Platform.OS === "ios") {
              source["type"] = 'image/jpeg';
            }
          }
          console.log("photo before onFileButtonPress");
          this.props.onFileButtonPress(channelUrl, isOpenChannel, source);
        }
          
      } else if(response.photo === 'undetermined') {
        console.log("onPhotoAddPress inside response.photo undetermined");
        Permissions.request('photo').then(response => {
          this._onPhotoAddPress();
        });
      } else {
        console.log("onPhotoAddPress inside response.photo else");
        Alert.alert('Permission denied',
          'You declined the permission to access to your photo.',
          [ { text: 'OK' } ],
          { cancelable: false });
      }
    });
  };


  _pickImage = async () => {
    console.log("Inside pickImage");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    console.log("inside PI: " + result)
    this._onPhotoAddPress(result);
  };


  _renderFileMessageItem = rowData => {
    const message = rowData.item;
    if (message.isUserMessage()) {
      return <TextItem isUser={message.isUser} message={message.message} />;
    } else if (sbIsImageMessage(message)) {
      return <ImageItem isUser={message.isUser} message={message.url.replace("http://", "https://")} />;
    } else {
      return <FileItem isUser={message.isUser} message={message.name} />;
    }
  };

  _renderList = rowData => {
    const message = rowData.item;
    const { isOpenChannel } = this.props.navigation.state.params;
    const { channel } = this.state;
    if (message.isUserMessage() || message.isFileMessage()) {
      return (
        <Message
          key={message.messageId ? message.messageId : message.reqId}
          isShow={message.sender.isShow}
          isUser={message.isUser}
          profileUrl={message.sender.profileUrl.replace("http://", "https://")}
          onPress={() => this._onUserBlockPress(message.sender.userId)}
          nickname={message.sender.nickname}
          time={message.time}
          readCount={isOpenChannel || !channel ? 0 : channel.getReadReceipt(message)}
          message={this._renderFileMessageItem(rowData)}
        />
      );
    } else if (message.isAdminMessage()) {
      return <AdminMessage message={message.message} />;
    } else {
      return <View />;
    }
  };

  _renderTyping = () => {
    const { isOpenChannel } = this.props.navigation.state.params;
    return isOpenChannel ? null : (
      <View style={styles.renderTypingViewStyle}>
        <View style={{ opacity: this.props.typing ? 1 : 0, marginRight: 8 }}>
          {/* <BarIndicator count={4} size={10} animationDuration={900} color="#cbd0da" /> */}
        </View>
        <Text style={{ color: "#556077", fontSize: 15 }}>{this.props.typing}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <View style={styles.messageListViewStyle}>
          <FlatList
            ref={elem => this.flatList = elem}
            renderItem={this._renderList}
            data={this.props.list}
            extraData={this.state}
            keyExtractor={(item, index) => item.messageId + ''}
            onEndReached={() => this._getMessageList(false)}
            onEndReachedThreshold={0}
          />
        </View>
        <View style={styles.messageInputViewStyle}>
          {this._renderTyping()}
          <MessageInput
            onLeftPress={this._pickImage}
            onRightPress={this._onSendButtonPress}
            textMessage={this.state.textMessage}
            onChangeText={this._onTextMessageChanged}
          />
        </View>
        <View style={{marginBottom: 25}}>
          <KeyboardSpacer />
        </View>
      </View>
    )
  }
}

function mapStateToProps({ chat }) {
  let { title, memberCount, list, exit, typing } = chat;
  list = sbAdjustMessageList(list);
  return { title, memberCount, list, exit, typing };
}

export default connect(mapStateToProps, {
  groupChannelProgress,
  initChatScreen,
  getChannelTitle,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  onUserBlockPress,
  onFileButtonPress,
  typingStart,
  typingEnd,
  channelExit
})(Chat);

const styles = {
  renderTypingViewStyle: {
    flexDirection: "row",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 4,
    marginBottom: 0,
    paddingBottom: 25,
    height: 14
  },
  containerViewStyle: {
    backgroundColor: '#f1f2f6',
    flex: 1
  },
  messageListViewStyle: {
    flex: 10,
    transform: [{ scaleY: -1 }]
  },
  messageInputViewStyle: {
    flex: 1,
    marginBottom: 5,
    flexDirection: "column",
    justifyContent: "center"
  }
};
