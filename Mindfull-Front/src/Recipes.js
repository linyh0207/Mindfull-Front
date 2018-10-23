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
        <Text>Recipes page</Text>
        <Button 
          raised
          color='black'
          title="Recipe Details"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('RecipeDetails')}
        />
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