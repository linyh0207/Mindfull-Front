import React, { Component } from 'react';
import { 
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


class Index extends React.Component {
  static navigationOptions = {
    title: 'Index',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      modalVisible: false,
      loginModalVisible: false,
     
    }

  };

  signupModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setLoginModalVisible(visible) {
    this.setState({loginModalVisible: visible});
  }


  
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.username)
    return (
      <View style={styles.container}>

          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              }}>

              <View style={styles.modal}>
                <TextInput placeholder='Username' />
                <TextInput placeholder='Password' />
                <TextInput placeholder='Password Confirmation' />
                <TouchableHighlight
                  onPress={() => {
                    this.signupModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={{fontSize: 27}}>Sign Up</Text>
                </TouchableHighlight>
              </View>
            </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
              this.signupModalVisible(true);
              }}>
              <Text>Sign Up</Text>
            </TouchableHighlight>
        </View>


<TouchableHighlight
            onPress={() => {
              this.setLoginModalVisible(true);
            }}>
            <Text>Login</Text>
          </TouchableHighlight>
      <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.loginModalVisible}
          >

            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

              <View style={styles.modal}>
                <TextInput 
                  placeholder='Username' 
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                />
                <TextInput placeholder='Password' />
                <TouchableHighlight>
                  <Button 
                  raised
                  color='black'
                  buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
                  textStyle={{textAlign: 'center'}}

                    
                    onPress={() => 
                      
                      navigate('Search', {username: this.state.username})
                      }
                    title="Submit"
                  />
                  </TouchableHighlight>

                  <TouchableHighlight
                onPress={() => {
                  this.setLoginModalVisible(!this.state.loginModalVisible);
                }}>
                <Text>X</Text>
              </TouchableHighlight>
                 
                </View>
              </View>
            </Modal>

        
        </View>






      </View>
    );
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    marginTop: 22, 
    padding: 20, 
    width: 300, 
    backgroundColor: 'white', 
    justifyContent: 'center'
  },
}); 

export default Index;