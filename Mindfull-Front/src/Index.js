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
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://192.168.88.99:3000/push-token';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("token", token)

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}

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
      username: 'Mandy',
      password: '12345',
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

  componentDidMount() {
    console.log('REGISTER', registerForPushNotificationsAsync, PUSH_ENDPOINT)
    registerForPushNotificationsAsync().then(val => console.log(val))
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
                  value = {this.state.password} 
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
    backgroundColor: 'rgb(110,128,80)',
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