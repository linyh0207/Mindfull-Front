import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { 
  Card
} from 'react-native-elements';
import {
  Notifications,
} from 'expo';


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontFamily: 'HelveticaNeue-Medium', fontWeight: '500'}}>Recipes</Text>
      </View>
    );
  }
}

function getImageForRecipe(listId, apiId, apiKey){
  return fetch(`https://api.yummly.com/v1/api/recipe/${listId}?_app_id=${apiId}&_app_key=${apiKey}`, {
    method: 'GET'
  })
  .then((response) => response.json())
}

class Recipes extends Component {
  static navigationOptions = {
    headerTintColor: 'white',
    headerBackground: (
      <Image
        source={require('../images/header.jpg')}
        style={{height: 70}}
      />
    ),
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

    const PUSH_ENDPOINT = 'http://192.168.88.99:3000/push-token';

    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }
    
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
    
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: {
            value: token,
          },
          user: {
            username: 'Brent',
          },
        }),
      });
    }


    let ingredients = this.props.navigation.state.params.ingredients
    let url = `https://api.yummly.com/v1/api/recipes?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`
    let recipeUrl = `https://api.yummly.com/v1/api/recipe/${this.state.list.id}?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`

    if (ingredients.length <= 0) {
      this.props.navigation.navigate('Search')
    } else {
      ingredients.forEach(ingredient => 
        url += `&allowedIngredient[]=${ingredient}`
      )
      // *** Async method
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
              color: '#8C8B8B',
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
  }    
} 

 changeHeartColor(item) {
  //  console.log("list", this.state.list)
  const list = this.state.list.map(li => {
    if (li.id === item.id) {
      return {
        ...li,
        color: li.color === '#8C8B8B' ? 'pink' : '#8C8B8B',
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
    this.props.navigation.navigate('RecipeDetails', {recipe: item.id})
  }

  render() {
    return (
    <View style={styles.container}> 
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          {/* <Icon name="shopping-cart"/> */}
          <Text style={{color: 'black', fontSize: 18, fontFamily: 'HelveticaNeue-Light', marginTop: 5}}>MY INGREDIENTS 🛒       | </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('FavoriteRecipes', {favorite: this.state.favorite})}> 
          <Text style={{color: 'black', fontSize: 18, fontFamily: 'HelveticaNeue-Light', marginTop: 5}}>    MY FAVOURITES 🖤</Text>
        </TouchableOpacity>  
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
          <View>
            <Text style={{color:'white', fontFamily: 'HelveticaNeue-Light', fontSize: 20, marginBottom: 10, textDecorationLine: 'underline'}}>Ingredients I have:</Text>
              {this.props.navigation.state.params.ingredients.map(item => {
                return(
                  <Text style={{color:'white', fontFamily: 'HelveticaNeue-Light', fontSize: 20}} key={item}>{item}</Text>
                )
              })}
          </View>
      
      <View style={styles.exitButton}>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <Text style={{color: 'white', fontSize: 20, fontFamily: 'HelveticaNeue-Light'}}>EXIT</Text>
        </TouchableOpacity>
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
                      buttonStyle={{ width: 280}}
                      textStyle={{textAlign: 'center', fontFamily: 'HelveticaNeue-Light'}}
                      onPress={
                        this.getRecipeDetails.bind(null, item) 
                      }
                    />
                    <View>
                      <TouchableOpacity
                        onPress={
                          this.changeHeartColor.bind(null, item)
                        }>
                        <Text style={{fontSize: 32, color: `${item.color}`}}>♥</Text>
                      </TouchableOpacity>
                    </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    marginTop: 22, 
    padding: 20, 
    width: 300, 
    height: 300,
    backgroundColor: 'rgb(110,128,80)', 
    justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: 'transparent',
    width: 100, 
    padding: 5, 
    borderWidth: 1,
    marginLeft: 145,
    borderColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodTitle: {
    flexDirection:'row',
  },
});


export default Recipes;



// AJAX POST REQUEST
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