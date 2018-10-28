import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { 
  Icon
} from 'react-native-elements';


class Recipes extends Component {
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
      list: [],
      recipe: [],
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
      heartColor: 'black',
    };
    this.changeHeartColor = this.changeHeartColor.bind(this);
    this.getRecipeDetails = this.getRecipeDetails.bind(this)
  }



  componentDidMount = () => {  
    let ingredients = this.props.navigation.state.params.ingredients
    let url = `https://api.yummly.com/v1/api/recipes?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`
    
    if (ingredients.length <= 0) {
      this.props.navigation.navigate('Search')
    } else {
      ingredients.forEach(ingredient => 
        url += `&allowedIngredient[]=${ingredient}`
      )
    
    fetch(`${url}`, {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const newList = responseJson.matches.map(match => {
        let matchIngredients = match.ingredients
        let missingIngredients = matchIngredients.filter(function(x){
          return ingredients.indexOf(x) < 0;
        })
        return ({
          food: match.recipeName,
          image: match.smallImageUrls,
          missingIngredients: missingIngredients,
          id: match.id,
          color: 'black',
        });
      });
      this.setState({
        list: newList
      });
    })
    .catch((error) => {
       console.error(error);
    });
  }
  
 
    // var ingredients = {ingredients: 'apple'};
    // fetch("http://192.168.88.99:3000/recipes", {
    //   method: "POST",
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body:  JSON.stringify(ingredients)
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   let newList = {...this.state.list}
    //   newList = responseJson.result
    //    this.setState({
    //       list: newList
    //    }, () => console.log('newList is...',this.state.list))
       
    // })
    // .catch((error) => {
    //    console.error(error);
    // });


 }


 changeHeartColor(item) {
  //  console.log("list", this.state.list)
  const list = this.state.list.map(li => {
    if (li.id === item.id) {
      return {
        ...li,
        color: li.color === 'black' ? 'pink' : 'black',
      };
    }
    return li;
  });
  this.setState({list});
}

  getRecipeDetails(item) {
    const recipe = this.state.recipe
    this.state.list.forEach(li => {
      if (li.id === item.id) {
        recipe.push(li.id)
        // console.log('HERE', recipe)
      }
      return recipe
    });
    this.setState({recipe})
    this.props.navigation.navigate('RecipeDetails', {recipe: this.state.recipe})
  }

  
  render() {
    const firstThing = this.state.list[0];
    // console.log("THIS STATE LIST", this.state.list)
    // console.log("THIS STATE RECIPE", this.state.recipe)
    // console.log("RECIPEEEEEEE",this.state.recipe)

    return (

      <ScrollView contentContainerstyle={styles.container}>
        <Text>Ingredients I have:</Text>
      {this.props.navigation.state.params.ingredients.map(item => {
        return(
          <Text>{item}</Text>
        )
      })}
       
        {this.state.list.map(item => {
        // console.log('123', this.state.recipe)
          return (
            <View>
              
              
              <Image source={{uri: `${item.image}`}} style={{width: 100, height: 100}} />

              <Button 
                raised
                color='black'
                title={item.food}
                buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
                textStyle={{textAlign: 'center'}}
                onPress={
                  this.getRecipeDetails.bind(null, item) 
                }
              />
              
              {/* <Text>Do you have?</Text>
              {item.missingIngredients.map(ing=>{
                return(
                  <Text>{ing}</Text>
                )
              })} */}
                <Button 
                onPress={this.changeHeartColor.bind(null, item)}
                title='♥'
                color={item.color}
              />
               

              <Text>

              </Text>
            </View>
          );
        })}
        
        <Text>Recipes page</Text>
      
      </ScrollView>
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


export default Recipes;