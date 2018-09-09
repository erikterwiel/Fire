import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Drawer from "react-native-drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import bottle from "../bottle";
import Text from "../components/Text";
import TouchableText from "../components/TouchableText";
import TextBox from "../components/TextBox";

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

  navigateToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  navigateToSignup = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    const { circles, markers, rating, color } = this.state;

    const drawer = (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.header} />
        <TouchableNativeFeedback onPress={this.navigateToLogin}>
          <View style={styles.row}>
            <Icon name="login" size={36} style={{ marginEnd: 8 }} />
            <Text subtitle>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.navigateToSignup}>
          <View style={styles.row}>
            <Icon name="login" size={36} style={{ marginEnd: 8 }} />
            <Text subtitle>Signup</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );

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

    const menuButton = (
      <TouchableOpacity style={styles.menuButton} onPress={() => this._drawer.open()}>
        <Icon name="menu" size={32} color="#000" />
      </TouchableOpacity>
    );

    const qualityCircle = rating && (
      <View style={[styles.qualityCircle, { backgroundColor: color }]}>
        <Text h6 white center>{`${rating} / 100`}</Text>
      </View>
    );

    return (
      <Drawer
        ref={ref => this._drawer = ref}
        content={drawer}
        type="overlay"
        openDrawerOffset={0.2}
        tapToClose={true}
        style={{
          mainOverlay: {
            backgroundColor: "#000",
            opacity: 0.5,
          },
        }}
      >
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
          {menuButton}
          {qualityCircle}
        </View>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 160,
    width: "100%",
    backgroundColor: "#E90000",
  },
  row: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 16,
    left: 16,
    fontSize: 32,
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
