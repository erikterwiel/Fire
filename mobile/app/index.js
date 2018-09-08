import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";

import HomeScreen from "./screens/Home";

const RootStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

class App extends Component {
  render() {
    return (
      <RootStackNavigator />
    );
  }
}

export default App;
