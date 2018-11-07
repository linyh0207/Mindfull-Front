import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { 
  SearchBar,
  Icon
} from 'react-native-elements';


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontFamily: 'HelveticaNeue-Medium', fontWeight: '500'}}>Search</Text>
      </View>
    );
  }
}

class Search extends React.Component {
  static navigationOptions = {
    headerBackground: (
      <Image
        source={require('../images/header.jpg')}
        style={{height: 70}}
      />
    ),
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
    this.handleOnNavigateBack = this.handleOnNavigateBack.bind(this)
  };
  
  handleOnNavigateBack = (selected) => {
    let ingredients = this.state.ingredients
    selected.forEach(select => {
      ingredients.push(select)
    })
    this.setState({ingredients : ingredients})
  }

  handleOnNavigateBackFromScanner = (barcode) => {
    let ingredients = this.state.ingredients
      ingredients.push(barcode)
    this.setState({ingredients : ingredients})
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
        <Text style={{color: 'white', margin: 20, fontSize: 24, fontFamily: 'HelveticaNeue-Medium'}}>Welcome, {this.props.navigation.state.params.username}</Text>
        <View style={styles.mainComponent}>
          <View style={styles.searchComponent}>
            <SearchBar  
              value={this.state.text.toLowerCase()}
              lightTheme
              round
              searchIcon={{ size: 24 }}
              inputStyle={{backgroundColor: 'white'}}
              containerStyle={{backgroundColor: 'transparent', width: 220}}
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
          <View style={styles.twoButtons}>
            <View style={styles.indexButton}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ObjectRecognition', {onNavigateBack: this.handleOnNavigateBack.bind(this)})}>
                <Text style={{fontSize: 18, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue-Medium'}}>Food Recognition</Text>
              </TouchableOpacity>
            </View>
              <View style={styles.indexButton}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BarcodeScanner',{onNavigateBack: this.handleOnNavigateBackFromScanner.bind(this)})}>
                <Text style={{fontSize: 18, color: 'white', textAlign: 'center',fontFamily: 'HelveticaNeue-Medium'}}>Barcode Scanner</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>  
        
        <View style={styles.submitButton}>
          <TouchableOpacity
              onPress={() =>  {
                navigate('Recipes',{ingredients: this.state.ingredients})}
              }>
              <Text style={{fontSize: 20, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue-Medium'}}>Submit</Text>
            </TouchableOpacity> 
          </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.lozengeContainer}>
          {this.state.ingredients.map(item => {
              return (
                <View style={styles.lozenges} key={item}>
                  <Text style={{fontSize: 20, fontFamily: 'HelveticaNeue-Light', color: '#8C8B8B'}}>{item}</Text>
                  <TouchableOpacity onPress={() => {this.deleteItem(item)}}>
                    <Icon name="delete" size={24} color="#8C8B8B" />
                  </TouchableOpacity>
                </View>
              )
            })}
        </View>
      </KeyboardAvoidingView>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(110,128,80)',
    justifyContent: 'center',
    
  },
  cameraComponent: {
    width: 300, 
    margin: 20,
    alignItems: 'center', 
    paddingTop: 10, 
    paddingBottom: 10,
    backgroundColor: 'rgb(110,128,80)', 
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
    justifyContent: 'space-between',
  },
  mainComponent: {
    width: 300, 
    backgroundColor: 'rgb(110,128,80)', 
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    marginLeft: 60,

  },
  indexButton: {
    backgroundColor: 'rgb(110,128,80)',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
    width: 146, 
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20, 
  },
  submitButton: {
    backgroundColor: 'rgb(110,128,80)',
    borderWidth: 1,
    borderColor: 'white',
    width: 150, 
    padding: 5,
    marginLeft: 130,
    marginTop: 20
  },
  twoButtons: {
    flexDirection: 'row',
  },
  lozenges: {
    backgroundColor: 'rgba(255,255,255,0.9)',  
    width: 150, 
    height: 40,
    padding: 5, 
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10, 
  },
  lozengeContainer: {
    flex: 1,
    backgroundColor: 'rgb(110,128,80)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Search;