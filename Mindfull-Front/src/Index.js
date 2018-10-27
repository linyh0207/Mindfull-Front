import React, { Component } from 'react';
import { 
  Text,
  View,
  Button,
  TextInput,
  StyleSheet
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
      username: ''
     
    }

  };
  
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.username)
    return (
      <View style={styles.container}>
      <Text style={{fontSize: 27}}>Sign Up</Text>
      <TextInput placeholder='Username' />
      <TextInput placeholder='Password' />
      <Button title="Sign Up"
      />
      <Text style={{fontSize: 27}}>Login</Text>
                <TextInput 
                placeholder='Username' 
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                />
                <TextInput placeholder='Password' />
                <View style={{margin:7}} />
                <Button 
                 raised
                 color='black'
                 buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
                 textStyle={{textAlign: 'center'}}
                          onPress={() => this.props.navigation.navigate('Search', {username: this.state.username})}
                          title="Submit"
              
                      />
                 

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
}); 

export default Index;