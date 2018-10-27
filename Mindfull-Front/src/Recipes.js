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
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
      favorite: [],
    };
    
    this.changeHeartColor = this.changeHeartColor.bind(this);
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
          favorite: true,
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
          image: li.image
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
  console.log(this.state.favorite)
}




  render() {
    const firstThing = this.state.list[0];
    return (

      <ScrollView contentContainerstyle={styles.container}>
        <Text>Ingredients I have:</Text>
      {this.props.navigation.state.params.ingredients.map(item => {
        return(
          <Text>{item}</Text>
        )
      })}
        
        {this.state.list.map(item => {
          return (
            <View>
              <Text key={item.id}>{item.food}</Text>
              <Image source={{uri: `${item.image}`}} style={{width: 100, height: 100}} />
              {/* <Text>Do you have?</Text>
              {item.missingIngredients.map(ing=>{
                return(
                  <Text>{ing}</Text>
                )
              })} */}
                <Button 
                onPress={
                  this.changeHeartColor.bind(null, item)

                }
                title='♥'
                color={item.color}
              />
            </View>
          );
        })}
         <Button 
          raised
          color='black'
          title="Favorite Recipes"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('FavoriteRecipes', {favorite: this.state.favorite})}
        />
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