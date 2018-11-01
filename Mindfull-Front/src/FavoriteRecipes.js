import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Button
} from 'react-native';
import { 
  Card
} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontWeight: 'bold'}}>Favourite Recipes</Text>
      </View>
    );
  }
}

class FavoriteRecipes extends Component {
  static navigationOptions = {
    headerBackground: (
      <Image
        source={require('../images/header.jpg')}
        style={{height: 70}}
      />
    ),
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
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <ScrollView contentContainerStyle={styles.container}>


      {this.props.navigation.state.params.favorite.map(item => {
        return (
          <Card image={{uri: `${item.image}`}} key={item.id}>
          <Button 
                raised
                color='black'
                title={item.name}
                buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
                textStyle={{textAlign: 'center'}}
                onPress={() => navigate('RecipeDetails', { recipe: item.id })}
          />
          </Card>
        );
      })}
      </ScrollView>
    
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