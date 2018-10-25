import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';
import { 
  SearchBar 
} from 'react-native-elements';
import { 
  Camera, 
  Permissions
} from 'expo';


const API_ID = '21580375';
const API_KEY = 'da87403dad4e077ff0e40d912cd1051a';



class Search extends React.Component {
  static navigationOptions = {
        title: 'Search',
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      url: '',
      error: '',
    }
    this.handlePress = this.handlePress.bind(this);
  };
  /*once sumbit button is pressed, the text input is added as a query paremeter to url for the API Get Request*/
  handlePress() {
    const { text } = this.state ;
    this.setState({ text: this.state.text});
    this.setState({ url: 'http://api.yummly.com/v1/api/recipes?_app_id=' + API_ID + '&_app_key=' + API_KEY + '&q=' + text.replace(" ", "+")+'&maxResult=50&start=20'});
    AsyncStorage.setItem("search_text", (this.state.text), () => {
    });
    AsyncStorage.setItem("search_url", ('http://api.yummly.com/v1/api/recipes?_app_id=' + API_ID + '&_app_key=' + API_KEY + '&q=' + text.replace(" ", "+")+ this.state.selectedOptions+'&maxResult=50&start=20'), () => {
    });
  }
  /*method that updates chosen filter value*/
  // onValueChangeSort(value: string) {
  //   this.setState({
  //     selectedOptions: value
  //   });
  //   console.log(value);
  // }
  render() {
    const { selectedItems } = this.state;
    const { navigate } = this.props.navigation;
    return (
 
        <View style={styles.container}>

          <SearchBar
          style={styles.searchInput}
          value={this.state.text}
          round
          searchIcon={{ size: 24 }}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', width: 300}}
          onChangeText={(text) => this.setState({text})}
          placeholder='Search Ingredient' />
  



            
  

        <Button 
          raised
          title="Object Recognition"
          color='black'
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('ObjectRecognition')}
        />
        <Button 
          raised
          color='black'
          title="Barcode Scanner"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('BarcodeScanner')}
        />
        <Button 
          raised
          color='black'
          title="Recipe Page"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('Recipes')}
        />
        <TouchableHighlight onPress={() =>  navigate('Recipes')}>
          <Button
              onPress={() => { this.handlePress()}}
              color='black'
              title='Submit'
            />
            </TouchableHighlight>
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