import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class RecipeDetails extends Component {
  static navigationOptions = {
    title: 'Recipes',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.container}>
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


export default RecipeDetails;