import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  Image,
  ScrollView,
  Modal,
  
} from 'react-native';
import { 
  Icon,
  Card
} from 'react-native-elements';

function getImageForRecipe(listId, apiId, apiKey){
  return fetch(`https://api.yummly.com/v1/api/recipe/${listId}?_app_id=${apiId}&_app_key=${apiKey}`, {
    method: 'GET'
  })
  .then((response) => response.json())
}

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


class Recipes extends Component {
  static navigationOptions = {
    
    headerTintColor: 'white',

    headerTitle: (
      <LogoTitle />
      
    ),
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
      favorite: [],
      modalVisible: false,
    };
    
    this.changeHeartColor = this.changeHeartColor.bind(this);
    this.getRecipeDetails = this.getRecipeDetails.bind(this)
  }

  componentDidMount = () => {  
    let ingredients = this.props.navigation.state.params.ingredients
    let url = `https://api.yummly.com/v1/api/recipes?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`
    let recipeUrl = `https://api.yummly.com/v1/api/recipe/${this.state.list.id}?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`

    if (ingredients.length <= 0) {
      this.props.navigation.navigate('Search')
    } else {
      ingredients.forEach(ingredient => 
        url += `&allowedIngredient[]=${ingredient}`
      )
      // const recipesResult = await fetch(url, {method: 'GET'});
      // const {matches} = await recipesResult.json();
      // const list = matches.map(({id, recipeName, ingredients}) => {
      //   const missingIngredients = ingredients.filter(ing => !ingredients.includes(ing));
      //   return {
      //     food: recipeName,
      //     missingIngredients,
      //     id,
      //     color: 'black',
      //     favorite: true,
      //   }
      // });

      // this.setState({list});

      // const betterListItemPromises = list.map(async match => {
      //   const {images: [{hostedMediumUrl}]} = await getImageForRecipe(match.id, this.state.api.id, this.state.api.key);
      //   return {...match, image: hostedMediumUrl};
      // });

      // const betterList = await Promise.all(betterListItemPromises);
      // this.setState({list: betterList});    


      const getRecipesFromYummly = fetch(url, {method: 'GET'})
        .then(r => r.json());
      
      const listPromise = getRecipesFromYummly
        .then(({matches}) => {
          return matches.map(({id, recipeName, ingredients}) => {
            const missingIngredients = ingredients.filter(ing => !ingredients.includes(ing));
            return {
              food: recipeName,
              missingIngredients,
              id,
              color: 'black',
              favorite: true,
            }
          });
        });

      listPromise.then(list => {
        this.setState({list});
      });
      
      const listWithBetterImagesPromise = listPromise
        .then(list => {
          const betterListItemPromises = list.map(match => {
            const imagePromise = getImageForRecipe(match.id, this.state.api.id, this.state.api.key);
            const betterListItemPromise = imagePromise
              .then(({images:[{hostedLargeUrl}]}) => {
                return {...match, image: hostedLargeUrl};
              });
            return betterListItemPromise
          });

          const betterListItemsPromise = Promise.all(betterListItemPromises);
          return betterListItemsPromise;
        });
      listWithBetterImagesPromise
        .then(list => { this.setState({list})});
        
        //     fetch(`${url}`, {
  //       method: 'GET'
  //     })
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //           const newList = responseJson.matches.map(match => {
  //             let matchIngredients = match.ingredients
  //             let missingIngredients = matchIngredients.filter(function(x){
  //               return ingredients.indexOf(x) < 0;
  //             })
  //             return ({
  //               food: match.recipeName,
  //               // image: '',
  //               missingIngredients: missingIngredients,
  //               id: match.id,
  //               color: 'black',
  //               favorite: true,
  //             });
  //           });
  //           this.setState({list: newList})
  //         })
  //         .then(()=> {
  //           const updateList = this.state.list.map(list => {
  //             fetch(`https://api.yummly.com/v1/api/recipe/${list.id}?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`, {
  //               method: 'GET'
  //             })
  //             .then((response) => response.json())
  //             .then((responseJson) => {
               
  //               console.log('missingIngredients',matchIngredients)
  //               // console.log('images', responseJson.images[0].hostedMediumUrl)
  //               return ({
  //                 ...list, 
  //                 image: responseJson.images[0].hostedMediumUrl
  //               })
  //             })
  //             // console.log('am i here?', newList)
  //             // console.log("HEREEEEE", list)
  //             return list
  //             // this.setState({ list: updateList })
  //           })
  //           this.setState({ list: updateList })
  // //           // console.log('AFTER SET STATE', this.state.list)
  //         })
  // //       .catch((error) => {
  // //         console.error(error);
  // //   })
  }    
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

 changeHeartColor(item) {
  //  console.log("list", this.state.list)
  const list = this.state.list.map(li => {
    if (li.id === item.id) {
      return {
        ...li,
        color: li.color === 'black' ? 'pink' : 'black',
        favorite: li.favorite === true ? false : true,
      };
    }
    return li;
  });
  this.setState({list});

  let favorite = this.state.favorite
  this.state.list.map(li => {
    if (li.id === item.id) {
      if(li.favorite === true) {
        favoriteRecipe = {
          name: li.food,
          image: li.image,
          id: li.id
        }
        favorite.push(favoriteRecipe)
        this.setState({favorite})
      } else {
        console.log('else')
        favorite.map((f,i) => {
          if (f.name === li.food) {
            favorite.splice(i, 1); 
            this.setState({favorite})
          }
        })
      }
    }
  })
}

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

  getRecipeDetails(item) {
    // const recipe = this.state.recipe
    
    // this.state.list.forEach(li => {
    //   if (li.id === item.id) {
    //     recipe.push(li.id)
    //     // console.log('HERE', recipe)
    //   }
    //   return recipe
    // });
    // this.setState({recipe})
    // this.props.navigation.navigate('RecipeDetails', {recipe: this.state.recipe})
    // // console.log('recipe', this.state.recipe)

    this.props.navigation.navigate('RecipeDetails', {recipe: item.id})
  }

  render() {
    const firstThing = this.state.list[0];
    return (

    <View style={styles.container}> 

      <View style={styles.navbar}>
        <Button
        raised
        color='black'
        title="My Ingredients"
          onPress={() => {
            this.setModalVisible(true);
          }}
          
        />
        <Button 
          raised
          color='black'
          title="Favorite Recipes"
          
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('FavoriteRecipes', {favorite: this.state.favorite})}
        />
      </View> 

    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.modalVisible}>

      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
      
      
      <View style={styles.modal}>
        <Text>Ingredients I have:</Text>
          {this.props.navigation.state.params.ingredients.map(item => {
            return(
              <Text key={item}>{item}</Text>
            )
          })}
      
      <View style={styles.exitButton}>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <Text>Exit</Text>
        </TouchableHighlight>
        </View>
      </View>
    </View>
  </Modal>
    
</View>      

    <View style={styles.container}>
      
      <ScrollView>
        
        {this.state.list.map(item => {
        
          return (
            <Card image={{uri: `${item.image}`}} key={item.id}>
      
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
  
              <Button 
                onPress={
                  this.changeHeartColor.bind(null, item)
                }
                title='♥'
                color={item.color}
                size={20}
              />
             
            </Card>
          );
        })}
            
      </ScrollView>
    </View>
</View>
    );
  };
}

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
  foodItem: {
    backgroundColor: 'rgb(255,206,113)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    marginTop: 22, 
    padding: 20, 
    width: 300, 
    backgroundColor: 'lightgray', 
    justifyContent: 'center'
  },
  exitButton: {
    backgroundColor: 'rgb(255,206,113)',
    width: 100, 
    padding: 5, 
    borderRadius: 10,
    marginTop: 20,
  },
  navbar: {
    flexDirection: 'row',
  },
  foodTitle: {
    flexDirection:'row',
  },
});


export default Recipes;