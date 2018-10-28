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
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              }}>

              <View style={styles.modal}>
                <TextInput style={styles.textBox} placeholder='Username' />
                <TextInput style={styles.textBox} placeholder='Password' />
                <TextInput style={styles.textBox} placeholder='Password Confirmation' />
                
                <View style={styles.button}>
                  <TouchableHighlight
                    onPress={() => {
                      this.signupModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Sign Up</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            </Modal>
          
            <View style={styles.indexButton}>
            <TouchableHighlight
              onPress={() => {
              this.signupModalVisible(true);
              }}>
              <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Sign Up</Text>
            </TouchableHighlight>
            </View>
        </View>

<View style={styles.indexButton}>
<TouchableHighlight
            onPress={() => {
              this.setLoginModalVisible(true);
            }}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Login</Text>
          </TouchableHighlight>
          </View>


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
                  style={styles.textBox} 
                  placeholder='Username' 
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                />
                <TextInput style={styles.textBox} placeholder='Password' />

                <View style={styles.button}>
                <TouchableHighlight onPress={() => 
                      
                      navigate('Search', {username: this.state.username})
                      }>
                
                  <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Login</Text>

                    
                  </TouchableHighlight>
                  </View>

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
  button: {
    backgroundColor: 'rgb(255,206,113)',
    width: 100, 
    padding: 5, 
    borderRadius: 10,
    marginTop: 10,
  },
  indexButton: {
    backgroundColor: 'rgb(255,206,113)',
    width: 200, 
    padding: 5, 
    borderRadius: 10,
    marginTop: 10,
  },
  textBox: {
    height: 40, 
    borderColor: 'lightgray', 
    borderWidth: 1, 
    textAlign: 'center',
    marginTop: 10,

  },
}); 

export default Index;