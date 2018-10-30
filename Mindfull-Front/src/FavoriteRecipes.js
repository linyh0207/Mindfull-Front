import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
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
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontWeight: 'bold'}}>Recipe Details</Text>
      </View>
    );
  }
}

class FavoriteRecipes extends Component {
  static navigationOptions = {
    
    
    headerTintColor: 'white',

    headerTitle: (
      <LogoTitle />
      
    ),
  };

  constructor (){
    super();
    this.state = {
      favorite: [],
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
    };
  }
 
  componentDidMount = () => {  
    console.log('favorite', this.props.navigation.state.params.favorite)
    let recipeUrl = `https://api.yummly.com/v1/api/recipe/${this.props.navigation.state.params.favorite}?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`

    fetch(`${recipeUrl}`, {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('res', responseJson)
    //     let newList ={
    //     food: response.name,
    //     image: response.images[0].hostedLargeUrl,
    //     directions: response.source.sourceRecipeUrl
    //     };
    //   this.setState({
    //     favorite: newList
    //   });
    // })
    // .catch((error) => {
    //    console.error(error);
    // });
    // console.log('here', this.state.favorite)
  })
}

  // handleClick = () => {
  //   Linking.canOpenURL(this.state.recipe.directions).then(supported => {
  //     if (supported) {
  //       Linking.openURL(this.state.recipe.directions);
  //     } else {
  //       console.log("Don't know how to open URI: " + this.props.url);
  //     }
  //   });
  // };

  render() {
    return (
      
      <View style={styles.container}>
      <ScrollView>
       <Text>Favorite Recipes</Text>
      {this.props.navigation.state.params.favorite.map(item => {
        return (
          <Card image={{uri: `${item.image}`}} >
          <Text>{item.name}</Text>
          </Card>
        );
      })}
      </ScrollView>
      </View>
    )
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


export default FavoriteRecipes;