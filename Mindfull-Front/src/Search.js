import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { 
  SearchBar 
} from 'react-native-elements';
import { 
  Camera, 
  Permissions
} from 'expo';



class Search extends Component {
  static navigationOptions = {
    title: 'Search',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', borderRadius: 5, width: 300}}
          // onChangeText={someMethod}
          // onClear={someMethod}
          placeholder='Search Ingredient' />
        <Button 
          raised
          title="Object Recognition"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('ObjectRecognition')}
        />
        <Button 
          raised
          title="Barcode Scanner"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('BarcodeScanner')}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Search;