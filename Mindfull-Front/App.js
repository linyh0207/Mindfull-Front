import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { 
  Permissions, 
  Notifications 
} from 'expo';

import Index from './src/Index.js'
import Search from './src/Search.js'
import ObjectRecognition from './src/ObjectRecognition.js'
import BarcodeScanner from './src/BarcodeScanner.js'
import Recipes from './src/Recipes.js' 
import RecipeDetails from './src/RecipeDetails.js' 
import FavoriteRecipes from './src/FavoriteRecipes.js' 
import CameraResult from './src/CameraResult.js' 



const PUSH_ENDPOINT = 'http://192.168.88.119:3000/push-token';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("token", token)

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}

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
  componentDidMount() {
    console.log('REGISTER', registerForPushNotificationsAsync, PUSH_ENDPOINT)
    registerForPushNotificationsAsync().then(val => console.log(val))
  }
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('MindFull', () => App)


console.disableYellowBox = true

export default App;


