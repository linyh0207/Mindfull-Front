import React, { Component } from 'react';

import { 
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking
} from 'react-native';


class RecipeDetails extends Component {
  static navigationOptions = {
    title: 'Recipes',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor (){
    super();
    this.state = {
      recipe: [],
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
    };
  }

  componentDidMount = () => {  
    let recipeUrl = `https://api.yummly.com/v1/api/recipe/${this.props.navigation.state.params.recipe}?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`

    fetch(`${recipeUrl}`, {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log("responseJson", responseJson)
          
        let newList ={
        food: responseJson.name,
        image: responseJson.images[0].hostedSmallUrl,
        ingredients: responseJson.ingredientLines,
        directions: responseJson.source.sourceRecipeUrl
        };
      this.setState({
        recipe: newList
      });
    })
    .catch((error) => {
       console.error(error);
    });
  }

  handleClick = () => {
    Linking.canOpenURL(this.state.recipe.directions).then(supported => {
      if (supported) {
        Linking.openURL(this.state.recipe.directions);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };


  render() {

    // console.log('WHAT', this.state.recipe)
  
    return (
      
      <View style={styles.container}>
      <Text>Recipe Details</Text>
      <Text> {this.state.recipe.food} </Text>
      <Image source={{uri: this.state.recipe.image}}
       style={{width: 200, height: 200}} />
      
      <Text> Ingredients </Text>

      {console.log('ingredients', this.state.recipe.ingredients)}
       
      {/* {this.state.recipe.ingredients.map(item => {
         return(
          <Text> {item} </Text>
        )
      })} */}
      <Text> {this.state.recipe.ingredients} </Text>

      {/* {console.log('state within render', this.state.recipe)} */}
      <Text onPress={this.handleClick}> Directions </Text>      
               
      </View>
    );
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default RecipeDetails;