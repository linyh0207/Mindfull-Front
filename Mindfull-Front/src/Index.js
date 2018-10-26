import React, { Component } from 'react';
import { 
  Text,
  View,
  Button
} from 'react-native';


class Index extends React.Component {
  static navigationOptions = {
    title: 'Index',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View>
      <Text>Index</Text>

      <Button 
          raised
          color='black'
          title="Search"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('Search')}
        />
      </View>
    );
  };
}

export default Index;