import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

import bottle from "../bottle";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      fires: [],
    };
  }

  async componentDidMount() {
    this.setState({ fires: await bottle.fireManager.fetchAllFires() });
  }

  render() {
    console.log(this.state.fires);
    return (
      <MapView
        style={styles.map}
        provider="google"
        mapType="hybrid"
        showsUserLocation={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default HomeScreen;
