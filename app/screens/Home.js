import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import bottle from "../bottle";

class HomeScreen extends Component {

  constructor() {
    super();
    this.state = {
      circles: [],
      markers: [],
    };
  }

  async componentDidMount() {
    const fireData = await bottle.fireManager.fetchFireData();
    const { circles, markers } = fireData;
    this.setState({ circles, markers });
  }

  render() {
    const circles = this.state.circles.map((circle, index) => (
        <Circle
          key={index}
          center={circle}
          radius={circle.radius * 2}
          fillColor="rgba(255, 0, 0, 0.5)"
        />
    ));

    const markers = this.state.markers.map((marker, index) => (
      <Marker
        key={index}
        title={marker.title}
        description={marker.content}
        coordinate={marker}
      />
    ));

    return (
      <MapView
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        initialRegion={{
          latitude: 45.719844,
          longitude: -120.547995,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        minZoomLevel={6}
        maxZoomlevel={16}
      >
        {circles}
        {markers}
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
