import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Search from './src/Search.js'
import Reminder from './src/Reminder.js'
import ObjectRecognition from './src/ObjectRecognition.js'  

const RootStack = createStackNavigator(
  {
    Search: {
      screen: Search,
    },
    Reminder: {
      screen: Reminder,
    },
    ObjectRecognition: {
      screen: ObjectRecognition,
    },
  },
  {
    initialRouteName: 'Search',
    },
);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('MindFull', () => App)

export default App;
