import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


class FavoriteRecipes extends Component {
  static navigationOptions = {
    title: 'Favorite',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor (){
    super();
    this.state = {
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
    };
  }
 
  render() {
    return (
      <View style={styles.container}>
       <Text>Favorite Recipes</Text>
      {this.props.navigation.state.params.favorite.map(item => {
        return (
          <View>
          <Text>{item.name}</Text>
          <Image source={{uri: `${item.image}`}} style={{width: 100, height: 100}} />
          </View>
        );
      })}
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
});


export default FavoriteRecipes;