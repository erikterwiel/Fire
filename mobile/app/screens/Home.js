import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MapView, { Circle } from "react-native-maps";

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

    const fires = this.state.fires.map((fire, index) => (
        <Circle
          key={index}
          center={{
            latitude: parseFloat(fire.latitude),
            longitude: parseFloat(fire.longitude),
          }}
          radius={fire.radius * 10}
          fillColor="rgba(255, 0, 0, 0.5)"
        />
    ));


    // const fires = this.state.fires[0] ? (
    //   <Circle
    //     center={{
    //       latitude: 49.0,
    //       longitude: -120.0,
    //     }}
    //     radius={1000000}
    //     fillColor="rgba(255, 0, 0, 0.5)"
    //   />
    // ) : null;

    return (
      <MapView
        style={styles.map}
        provider="google"
        mapType="hybrid"
        showsUserLocation={true}
      >
        {fires}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default HomeScreen;
