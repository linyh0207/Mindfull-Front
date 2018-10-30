import React, { Component } from 'react';

import { 
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
  ScrollView
} from 'react-native';


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>

      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontWeight: 'bold'}}>Recipe Details</Text>
      </View>
    );
  }
}

class RecipeDetails extends Component {
  static navigationOptions = {
    
    
    headerTintColor: 'white',

    headerTitle: (
      <LogoTitle />
      
    ),
  };

  constructor (){
    super();
    this.state = {
      recipe: [
        {ingredients: []}
      ],
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
    .then(response => response.json())
    .then((responseJson) => {
          
        let newList ={
        food: responseJson.name,
        image: responseJson.images[0].hostedLargeUrl,
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
    // const { navigate } = this.props.navigation;

    console.log('WHAT IS HEREEEE', this.state.recipe)

    return (

      <View style={styles.container}>
      <ScrollView>

      <Text>Recipe Details{'\n'}</Text>
      <Text> {this.state.recipe.food} </Text>
      <Image source={{uri: this.state.recipe.image}}
       style={{width: 200, height: 200}} />
      
      <Text> Ingredients </Text>
      
      {this.state.recipe.ingredients && this.state.recipe.ingredients.map(item => {
        return(
          <Text key={item}>{'\n'}• {item}</Text>
        )
      })}

      <Text>{'\n'}</Text>
      <Text onPress={this.handleClick}> Instructions </Text>      
               
      </ScrollView>

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
  logoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default RecipeDetails;