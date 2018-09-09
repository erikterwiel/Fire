import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import bottle from "../bottle";
import Text from "../components/Text";

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
    const { circles, markers, rating, color } = this.state;

    const mapCircles = circles.map((circle, index) => (
        <Circle
          key={index}
          center={circle}
          radius={circle.radius * 2}
          fillColor="rgba(255, 0, 0, 0.5)"
        />
    ));

    const mapMarkers = markers.map((marker, index) => (
      <Marker
        key={index}
        title={marker.title}
        description={marker.content}
        coordinate={marker}
      />
    ));

    const qualityCircle = rating && (
      <View style={[styles.qualityCircle, { backgroundColor: color }]}>
        <Text h6 white center>{`${rating} / 100`}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          provider="google"
          showsUserLocation={true}
          initialRegion={this._initialRegion}
          minZoomLevel={6}
          maxZoomlevel={16}
          onRegionChangeComplete={this.fetchConditionsForLocation}
        >
          {mapCircles}
          {mapMarkers}
        </MapView>
        {qualityCircle}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qualityCircle: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
