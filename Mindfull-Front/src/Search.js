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
  TouchableOpacity,
  Image,
  AsyncStorage,
  FlatList
} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';
import { 
  SearchBar,
  Icon
} from 'react-native-elements';
import { 
  Camera, 
  Permissions
} from 'expo';


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
      ingredients:[],
      url: '',
      error: '',
      text:'',
    }
    this.addItem = this.addItem.bind(this);
  };
  
  addItem() {
    const newItems = this.state.text
    const ingredients = this.state.ingredients.concat(newItems)
    this.setState({ingredients})
    this.state.text = ''
  }

  deleteItem(key) {
    console.log('my key', key)
    const ingredients = this.state.ingredients.filter(ingr => ingr != key);
    // const ingredients = this.state.ingredients.splice(key, 1)
    this.setState({ingredients})
  }


  render() {
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
          onPress={() => {this.addItem()}}
          color='black'
          title='Add Item'
          />

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

        {/* // <FlatList
        // {...this.state.data.ingredients.map(item => {
        //   return (
        //   <Text key={item}> {item}</Text>
        //   )
        // })}

        // /> */}



<FlatList
  data={this.state.ingredients}
  renderItem={({ item }) => (
    <View style={{backgroundColor: 'pink', width: 300, padding: 10, margin: 10}}>
    <Text style={{fontSize: 20}}>{item}</Text>
    <TouchableOpacity
  onPress={() => {this.deleteItem(item)}}>
    <Icon name="delete" size={24} color="white" />
  </TouchableOpacity>
  </View>
)}
  keyExtractor={(item, index) => index.toString()}
/>




        <TouchableHighlight>
          <Button
              onPress={() =>  this.props.navigation.navigate('Recipes')}
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