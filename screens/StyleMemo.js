import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import { Button, Icon } from '../components';
import { CheckBox , ButtonGroup  } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native';
// import SegmentControl from 'react-native-segment-controller';


export default class StyleMemo extends Component {
  
  constructor () {
    super()
    this.state = {
      checked: false,
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  static navigationOptions = ({navigation}) => ({
      headerTitle: 'Style Memo',
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
          name='md-log-out'
          type='ionicon'
          color='#6b52ae'
          onPress={() => console.log('hello')}
          containerStyle ={ marginRight= 15 }
          />
      ),
    });
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['0-4 Weeks', '1-2 Months', '3-6 Months', '6+ Months']
    const { selectedIndex } = this.state
    return (
            <ScrollView>
                <View style={styles.container}>
                <Image
                        style={styles.chair}
                        source={require('./chair.jpg')}
                    />
                
                <Text style={styles.h1}>
                {"\n"}ENHANCE YOUR SERVICE {"\n"}        </Text>
                <Text style={styles.h2}>
                Submit a StyleMemo™ to visually prepare your stylist and save time during hands-on services. 
                {"\n"} </Text>

                <Text style={styles.h3}>
                Date of My Last Haircut: {"\n"}</Text>
                        <ButtonGroup
                          onPress={this.updateIndex}
                          selectedIndex={selectedIndex}
                          buttons={buttons}
                          containerStyle={{height: 50, alignContent: 'center', backgroundColor: '#FCF7F6'}}
                          textStyle={{fontWeight:'300', fontSize: 15, color: 'black'}}
                          selectedButtonStyle={{backgroundColor: "#33FFC1"}}
                          selectedTextStyle={{color: 'black'}}
                        />
                        {/* <CheckBox
                        title='0-4 Weeks'
                        checked={this.state.checked}
                        onPress={(value) => this.setState({ checked: !this.state.checked, haircut: value })}
                        />
                        <CheckBox
                        title='1-2 Months'
                        checked={this.state.checked}
                        onPress={() => this.setState({ checked: !this.state.checked })}
                        />
                        <CheckBox
                        title='3-6 Months'
                        checked={this.state.checked}
                        onPress={() => this.setState({ checked: !this.state.checked })}

                        />
                        <CheckBox
                        title='6+ Months'
                        checked={this.state.checked}
                        onPress={() => this.setState({ checked: !this.state.checked })}

                        /> */}
                
                <Text style={styles.h3}>
                    {"\n"}My Current Length:{"\n"}        </Text>
                            <CheckBox
                            title='Short'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Medium'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Long'
                            checked={this.state.checked}
                            />
                <Text style={styles.h3}>
                    {"\n"}My Desired Length:{"\n"}        </Text>
                            <CheckBox
                            title='Short'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Medium'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Long'
                            checked={this.state.checked}
                            />
                    
                    <Text style={styles.h3}>
                        {"\n"}My Hair Density:{"\n"}        </Text>
                                <CheckBox
                                title='Type I: Thin'
                                checked={this.state.checked}
                                />
                                <CheckBox
                                title='Type II: Medium'
                                checked={this.state.checked}
                                />
                                <CheckBox
                                title='Type III: Coarse'
                                checked={this.state.checked}
                                />

                <Text style={styles.h3}>
                    {"\n"}My Current Hair Color:{"\n"}        </Text>
                            <CheckBox
                            title='Black'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Blonde'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Brown'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Grey'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Red'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Please Recommend'
                            checked={this.state.checked}
                            />

                <Text style={styles.h3}>
                    {"\n"}My Desired Hair Color:{"\n"}        </Text>
                                <CheckBox
                            title='Black'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Blonde'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Brown'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Grey'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Red'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Please Recommend'
                            checked={this.state.checked}
                            />

                <Text style={styles.h3}>
                    {"\n"}Color and Chemical Services History.</Text>
                    <Text style={styles.h4}>
                    Select all that apply</Text>
                                <Text style={styles.h3}>
                                {"\n"}In the past 6 months:{"\n"}        </Text>
                            <CheckBox
                            title='I have dyed my hair at home with box dye'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='A professional has dyed my hair'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='My hair has been bleached'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='My hair has been permed'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='A professional has administered keratin smoothing, Brazilian blowout, or Relaxer'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='I need to explain'
                            checked={this.state.checked}
                            />

                <Text style={styles.h3}>
                    {"\n"}My hair is best described as:{"\n"}        </Text>
                            <CheckBox
                            title='Fine, but I have a lot of hair'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Frizzy, regardless of styling'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Compliant, it will hold style such as straighening or curling'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Stubborn, will not hold even when professionally styled'
                            checked={this.state.checked}
                            />

                <Text style={styles.h3}>
                    {"\n"}And a little about me:{"\n"}        </Text>
                            <CheckBox
                            title='I am new to the area and looking for a stylist'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='I like to relax and slow down when in a salon'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='I am loyal to my stylist. I just need something on a one time basis'
                            checked={this.state.checked}
                            />
                            <CheckBox
                            title='Stylist loyality is not that important to me, I want quality'
                            checked={this.state.checked}
                        />
                        
                        
                </View>
            </ScrollView>
    );
  }
}
<CheckBox
  center
  title='Click Here to Remove This Item'
  iconRight
  iconType='material'
  checkedIcon='clear'
  uncheckedIcon='add'
  checkedColor='green'
//   checked={this.state.checked}
/>
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header:{
    backgroundColor: "#00BFFF",
  },
  h1:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
  },
  h2:{
    fontSize:16,
    color:"#000000",
    fontWeight:'600',
  },
  h3:{
    fontSize:15,
    color:"#696969",
    fontWeight:'600',
  },
  h4:{
    fontSize:15,
    color:"#696969",
    fontWeight:'600',
    fontStyle:'italic',
  },
  chair:{
    width:315,
    height:400,
    backgroundColor: "#00BFFF",
},
});