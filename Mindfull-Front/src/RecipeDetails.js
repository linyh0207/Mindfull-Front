import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
  ScrollView,
  Header
} from 'react-native';
import { 
  Card
} from 'react-native-elements';


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontWeight: 'bold'}}>Recipes</Text>
      </View>
    );
  }
}

class RecipeDetails extends Component {
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

  constructor (props){
    super(props);
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

      <ScrollView contentContainerStyle={styles.container}>
     
      <Text style={{fontSize: 20, fontFamily: 'HelveticaNeue-Light'}}> {this.state.recipe.food} {'\n'}</Text>
      <View style={styles.container}>
      </View>
      
      {/* <View style={styles.heading}>
      
      <Text style={{fontSize: 20, fontFamily: 'HelveticaNeue-Light'}}> {'\n'} {this.state.recipe.food} {'\n'}</Text> */}
      <Text style={{fontSize: 20, fontFamily: 'HelveticaNeue-Light'}}> {'\n'} {this.state.recipe.food} {'\n'}</Text> 
      <Image source={{uri: this.state.recipe.image}}
       style={{width: 200, height: 200}}/>

      
      {/* <Text>Recipe Details{'\n'}</Text>
      <Text> {this.state.recipe.food} {'\n'}</Text>
      <Image source={{uri: this.state.recipe.image}}
       style={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center'}}/> */}
      <View style={styles.heading}>
      <Text style={{fontSize: 20, fontFamily: 'HelveticaNeue-Light'}}> {'\n'} Ingredients </Text>
      </View>
      
      <Card>
      {this.state.recipe.ingredients && this.state.recipe.ingredients.map(item => {
        return(
          <Text key={item} style={{fontSize: 15, fontFamily: 'HelveticaNeue-Light', padding: 5}}>{'\n'}• {item}</Text>
        )
      })}
      </Card>

      <View style={styles.heading}>
      <Text>{'\n'}</Text>
      <Text onPress={this.handleClick} style={{fontSize: 20, fontFamily: 'HelveticaNeue-Light'}}> Click here for Instructions {'\n'}{'\n'}</Text>      
      </View>

      </ScrollView>


    );
  };
};

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});


export default RecipeDetails;