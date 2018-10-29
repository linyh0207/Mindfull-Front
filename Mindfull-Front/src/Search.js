import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
  TextInput,
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

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10}}>Search</Text>
      </View>
    );
  }
}


class Search extends React.Component {
  static navigationOptions = {
    
    
    headerTintColor: 'white',

    headerTitle: (
      <LogoTitle />
      
    ),
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

      <Text style={{color: 'white', margin: 20, fontSize: 24}}>Welcome, {this.props.navigation.state.params.username}</Text>

      <View style={styles.mainComponent}>
        
        
        
          <View style={styles.searchComponent}>
          <SearchBar
          
          value={this.state.text.toLowerCase()}
          round
          searchIcon={{ size: 24 }}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'transparent', width: 220, border: 'none'}}
          onChangeText={(text) => this.setState({text})}
          placeholder='Add Ingredient' />
          
          <View style={{marginLeft: 10}}>
          <Icon 
          onPress={() => {this.addItem()}}
          name='ios-add-circle'
          type='ionicon'
          color='white'
          size={40}
          marginLeft={30}
          />
          </View>
          </View>
 

          {/* <View style={styles.cameraComponent}>
          <Button 
            style={styles.button}
            title="Object Recognition"
            color='white'
            
            onPress={() => this.props.navigation.navigate('ObjectRecognition', {onNavigateBack: this.handleOnNavigateBack})}
          />
          </View>

          <View style={styles.cameraComponent}>
        <Button 
          style={styles.button}
          color='white'
          title="Barcode Scanner"
          
          onPress={() => this.props.navigation.navigate('BarcodeScanner')}
        />
        </View> */}

            <View style={styles.twoButtons}>
            <View style={styles.indexButton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ObjectRecognition', {onNavigateBack: this.handleOnNavigateBack})}>
              <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Food Recognition</Text>
            </TouchableOpacity>
            </View>
            
            <View style={styles.indexButton}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('BarcodeScanner')}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Barcode Scanner</Text>
          </TouchableOpacity>
          </View>
            </View>


    
    
      
      
 
      
      
  

        </View>  
        
        <View style={styles.submitButton}>
        <TouchableOpacity
            onPress={() =>  {
            
              navigate('Recipes',{ingredients: this.state.ingredients})}
            }>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Submit</Text>
          </TouchableOpacity> 
          </View>

          <View>
        <FlatList
        data={this.state.ingredients}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.lozenges}>
          <Text style={{fontSize: 20}}>{item}</Text>
          <TouchableOpacity
        onPress={() => {this.deleteItem(item)}}>
          <Icon name="delete" size={24} color="#8C8B8B" />
        </TouchableOpacity>
        </View>
      )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
        
  </View>


    );
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(180,227,120)',
    justifyContent: 'center',
  },
  cameraComponent: {
    width: 300, 
    margin: 20,
    alignItems: 'center', 
    paddingTop: 10, 
    paddingBottom: 10,
    backgroundColor: 'rgb(180,227,120)', 
    borderRadius: 10,
  },
  searchComponent: {
    width: 300, 
    margin: 20,
    alignItems: 'center',  
    flexDirection: 'row',
  },
  logoTitle: {
    flexDirection: 'row',
    marginRight: 30,
  },
  mainComponent: {
    width: 300, 
    backgroundColor: 'rgb(180,227,120)', 
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    marginLeft: 60,

  },
  indexButton: {
    backgroundColor: 'rgb(180,227,120)',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
    width: 146, 
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20, 
  },
  submitButton: {
    backgroundColor: 'rgb(180,227,120)',
    borderWidth: 1,
    borderColor: 'white',
    width: 150, 
    padding: 5,
    marginLeft: 130,
    marginTop: 20,
  },
  twoButtons: {
    flexDirection: 'row',
  },
  lozenges: {
    backgroundColor: 'rgba(255,255,255,0.9)', 
    color: '#8C8B8B',
    width: 150, 
    height: 40,
    padding: 5, 
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  

});




export default Search;