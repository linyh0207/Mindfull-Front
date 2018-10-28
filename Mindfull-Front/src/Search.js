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
  FlatList,
  Modal
} from 'react-native';
import Octicon from 'react-native-vector-icons/Ionicons';
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
    headerStyle: {
      backgroundColor: 'rgb(255,206,113)',
    },
    headerTintColor: 'white',
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
      text:''
    }
    this.addItem = this.addItem.bind(this);
  };
  
  handleOnNavigateBack = (selected) => {
    console.log("SELECTED pass by camera Result", selected)
    let ingredients = this.state.ingredients
    selected.forEach(select => {
      console.log("ingredients", ingredients)
      console.log("select", select)
      ingredients.push(select)
    })
    this.setState({ingredients})
  }
  
  addItem() {
    const newItems = this.state.text

    if (newItems.length === 0) {
      console.log('empty')
      this.props.navigation.navigate('Search')
    } else { 
      const ingredients = this.state.ingredients.concat(newItems)
      this.setState({ ingredients })
      this.state.text = '' 
    }
  }

  deleteItem(key) {
    const ingredients = this.state.ingredients.filter(ingr => ingr != key);
    this.setState({ingredients})
  }



  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        
        <View>
        <FlatList
        data={this.state.ingredients}
        renderItem={({ item }) => (
          <View style={{backgroundColor: 'pink', width: 200, padding: 10, margin: 10}}>
          <Text style={{fontSize: 20}}>{item}</Text>
          <TouchableOpacity
        onPress={() => {this.deleteItem(item)}}>
          <Icon name="delete" size={24} color="white" />
        </TouchableOpacity>
        </View>
      )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
        
        
        <Text>Welcome, {this.props.navigation.state.params.username}</Text>
          <View style={styles.searchComponent}>
          <SearchBar
          
          value={this.state.text.toLowerCase()}
          round
          searchIcon={{ size: 24 }}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', width: 250, borderRadius: 10}}
          onChangeText={(text) => this.setState({text})}
          placeholder='Add Ingredient' />
          
          <Icon 
          onPress={() => {this.addItem()}}
          name='ios-add-circle'
          type='ionicon'
          color='rgb(255,206,113)'
          size={40}
          marginLeft={30}
          />
          </View>
 

          <View style={styles.cameraComponent}>
          <Button 
            raised
            title="Object Recognition"
            color='white'
            
            onPress={() => this.props.navigation.navigate('ObjectRecognition', {onNavigateBack: this.handleOnNavigateBack})}
          />
          </View>

          <View style={styles.cameraComponent}>
        <Button 
          raised
          color='white'
          title="Barcode Scanner"
          
          onPress={() => this.props.navigation.navigate('BarcodeScanner')}
        />
        </View>


    
    
      
      
 
      
      
      <TouchableHighlight>
        <Button
          onPress={() =>  {
            
            navigate('Recipes',{ingredients: this.state.ingredients})}
          }
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
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  cameraComponent: {
    width: 300, 
    margin: 20,
    alignItems: 'center', 
    paddingTop: 10, 
    paddingBottom: 10,
    backgroundColor: 'rgb(255,206,113)', 
    borderRadius: 10,
  },
  searchComponent: {
    width: 300, 
    margin: 20,
    alignItems: 'center',  
    flexDirection: 'row',
  },
  

});




export default Search;