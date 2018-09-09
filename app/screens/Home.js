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
      rating: undefined,
      color: undefined,
      description: undefined,
      pollutant: undefined,
      recommendation: undefined,
    };
    this._airManager = bottle.airManager;
    this._initialRegion = {
      latitude: 45.719844,
      longitude: -120.547995,
      latitudeDelta: 10,
      longitudeDelta: 10,
    };
  }

  async componentDidMount() {
    await this.fetchConditionsForLocation(this._initialRegion);
    const fireData = await bottle.fireManager.fetchFireData();
    const { circles, markers } = fireData;
    this.setState({ circles, markers });
  }

  fetchConditionsForLocation = async (location) => {
    const response = await this._airManager.fetchConditionsForLocation(location);
    const {
      breezometer_aqi, breezometer_color, breezometer_description,
      dominant_pollutant_description, random_recommendations,
    } = response;
    this.setState({
      rating: breezometer_aqi,
      color: breezometer_color,
      description: breezometer_description,
      pollutant: dominant_pollutant_description,
      recommendation: random_recommendations[Object.keys(random_recommendations)[Math.floor(Math.random() * 4 + 1)]],
    });
  };

  render() {
    console.log(this.state);
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
        initialRegion={this._initialRegion}
        minZoomLevel={6}
        maxZoomlevel={16}
        onRegionChangeComplete={this.fetchConditionsForLocation}
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
