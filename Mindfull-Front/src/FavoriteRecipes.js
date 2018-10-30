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
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
    };
  }
 
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