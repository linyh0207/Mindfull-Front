import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Index from './src/Index.js'
import Search from './src/Search.js'
import ObjectRecognition from './src/ObjectRecognition.js'
import BarcodeScanner from './src/BarcodeScanner.js'
import Recipes from './src/Recipes.js' 
import RecipeDetails from './src/RecipeDetails.js' 
import FavoriteRecipes from './src/FavoriteRecipes.js' 
import CameraResult from './src/CameraResult.js' 



const RootStack = createStackNavigator(
  {
    Index: {
      screen: Index,
    },
    Search: {
      screen: Search,
    },
    ObjectRecognition: {
      screen: ObjectRecognition,
    },
    BarcodeScanner: {
      screen: BarcodeScanner,
    },
    Recipes: {
      screen: Recipes,
    },
    RecipeDetails: {
      screen: RecipeDetails,
    },
    FavoriteRecipes: {
      screen: FavoriteRecipes,
    },
    CameraResult: {
      screen: CameraResult,
    },
  },
  {
    initialRouteName: 'Index',
    },
);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('MindFull', () => App)


console.disableYellowBox = true

export default App;


