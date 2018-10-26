import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
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
      heartColor: 'black',
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
      let recipeList = [];
      responseJson.matches.forEach(key => (
        recipeList.push(key.recipeName)
      ))
      const newList = responseJson.matches.map(match => {
        return ({
          food: match.recipeName,
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


  render() {
    const firstThing = this.state.list[0];


    return (

      <View style={styles.container}>
        <Text>Ingredients I have:</Text>
        {this.state.list.map(item => {
          return (
            <View>
              <Text key={item.id}>{item.food}</Text>
                <Button 
                onPress={this.changeHeartColor.bind(null, item)}
                title='♥'
                color={item.color}
              />
            </View>
          );
        })}
        
        <FlatList
        data={this.props.navigation.state.params.ingredients}
        renderItem={({item}) => (
          <Text>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        />
        <Text>Recipes page</Text>
        <Button 
          raised
          color='black'
          title="Recipe Details"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('RecipeDetails')}
        />
        {/* <FlatList
          data={this.state.list}
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
              <Button 
              onPress={this.changeHeartColor}
              // title='♥'
              title={this.state.heartColor}
              color={this.state.heartColor}
              />

            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> */}
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


export default Recipes;