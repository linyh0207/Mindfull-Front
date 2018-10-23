import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class Recipes extends Component {
  static navigationOptions = {
    title: 'Recipes',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    // let recipeList = this.props.recipes.map(recipe => {
    // });
    return (
      <View style={styles.container}>
        {/* {recipeList} */}
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