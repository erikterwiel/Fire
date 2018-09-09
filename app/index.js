import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";

const RootStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
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
