import React, { Component } from 'react';
import { 
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage
} from 'react-native';

class Index extends React.Component {
  
  static navigationOptions = {
    headerBackground: (
      <Image
        source={require('../images/header.jpg')}
        style={{height: 70}}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    // console.log(this.state.username)
    // console.log(this.state.password)
    return (
      <ImageBackground
      source={require('../images/background5.jpg')}
      imageStyle={{resizeMode: 'stretch'}}
      style={styles.container}
    >
      <View style={styles.container}>

          <View >
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <ImageBackground source={require('../images/header.jpg')}
              style={styles.container}>
                <View style={styles.modal}>
                  <TextInput style={styles.textBox} placeholder='Username' />
                  <TextInput style={styles.textBox} secureTextEntry = {true} placeholder='Password' />
                  <TextInput style={styles.textBox} secureTextEntry = {true} placeholder='Password Confirmation' />
                
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {
                        this.signupModalVisible(!this.state.modalVisible)
                      }}>
                      <Text style={{fontSize: 20, color: '#8C8B8B', textAlign: 'center'}}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </Modal>
          
          
            <View style={styles.twoButton}>
              <View style={styles.indexButton}>
                <TouchableOpacity
                  onPress={() => {
                  this.signupModalVisible(true);
                  }}>
                  <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.indexButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setLoginModalVisible(true);
                  }}>
                  <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>


      <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.loginModalVisible}
          >
            <ImageBackground source={require('../images/header.jpg')}
              style={styles.container}>

              <View style={styles.modal}>
                <TextInput
                  style={styles.textBox} 
                  placeholder='Username' 
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                />
                
                <TextInput onChangeText = {(password) => this.setState({password})} 
                  style={styles.textBox} placeholder='Password'
                  value = {this.state.pass} 
                  secureTextEntry = {true} 
                />

                  <View style={styles.button}>
                    <TouchableOpacity onPress={() => {  
                        this.setLoginModalVisible(!this.state.loginModalVisible),     
                          navigate('Search', {username: this.state.username})
                          }}>
                      <Text style={{fontSize: 20, color: '#8C8B8B', textAlign: 'center'}}>Login</Text>
                    </TouchableOpacity>
                  </View>   
                </View>
              </ImageBackground>
            </Modal>

            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    marginTop: 22, 
    padding: 20, 
    width: 300, 
    backgroundColor: 'rgba(255,255,255,0.7)', 
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: 100, 
    padding: 5, 
    marginLeft: 160,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#8C8B8B'
  },
  twoButton: {
    flexDirection: 'row',
    marginTop: 400,
  },
  indexButton: {
    backgroundColor: 'rgb(180,227,120)',
    borderWidth: 1,
    borderColor: 'white',
    width: 150, 
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20, 
  },
  textBox: {
    height: 40, 
    borderColor: '#8C8B8B', 
    borderWidth: 1, 
    textAlign: 'center',
    marginTop: 10,
    color: '#8C8B8B',
    fontSize: 20,

  },
}); 

export default Index;