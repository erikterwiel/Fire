import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, TextInput } from "react-native";
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
      showAirDetails: false,
      showAddButtons: true,
      showPicker: false,
      pickingFire: undefined,
      displayText: "",
      showTextBox: false,
      newText: "",
      latitude: undefined,
      longitude: undefined,
      user: undefined,
    };
    this._airManager = bottle.airManager;
    this._fireManager = bottle.fireManager;
    this._authManager = bottle.authManager;
    this._initialRegion = {
      latitude: 45.719844,
      longitude: -120.547995,
      latitudeDelta: 10,
      longitudeDelta: 10,
    };
  }

  async componentDidMount() {
    this._userSubscription = this._authManager.user$.subscribe(user => {
      this.setState({ user });
    });
    await this.fetchConditionsForLocation(this._initialRegion);
    const fireData = await bottle.fireManager.fetchFireData();
    const { circles, markers } = fireData;
    this.setState({ circles, markers });
  }

  componentWillUnmount() {
    this._userSubscription.unsubscribe();
  }

  fetchConditionsForLocation = async (location) => {
    const response = await this._airManager.fetchConditionsForLocation(location);
    const {
      breezometer_aqi, breezometer_color, breezometer_description,
      dominant_pollutant_description, random_recommendations,
    } = response;
    this.setState({
      latitude: location.latitude,
      longitude: location.longitude,
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

  toggleAir = () => {
    this.setState({ showAirDetails: !this.state.showAirDetails });
  };

  pickProperty = () => {
    this.setState({
      showAddButtons: false,
      showPicker: true,
      pickingFire: false,
      displayText: "Select the location of your property.",
    });
  };

  pickFire = () => {
    this.setState({
      showAddButtons: false,
      showPicker: true,
      pickingFire: true,
      displayText: "Select the location of your discovered fire.",
    });
  };

  cancelPick = () => {
    if (!this.state.showTextBox) {
      this.setState({
        showAddButtons: true,
        showPicker: false,
        displayText: "",
      })
    } else {
      this.setState({
        showTextBox: false,
      });
    }
  };

  pickLocation = async () => {
    if (!this.state.showTextBox) {
      this.setState({
        showTextBox: true,
        displayText: "",
      })
      await this._fireManager.reportFire(this.state)
    } else {
      this.setState({
        showTextBox: false,
        showAddButtons: true,
        showPicker: false,
      });
      await this._authManager.addProperty(this.state);
    }
  };

  onChangeText = (text) => {
    this.setState({ newText: text })
  };

  render() {
    const {
      circles, markers, rating, color, user, description, pollutant, recommendation,
      showAddButtons, showPicker, displayText, showTextBox, showAirDetails,
    } = this.state;

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

    const propertyMarkers = user && user.properties ? user.properties.map((property, index) => {
      if (property.latitude && property.longitude && property.title) {
        return (
          <Marker
            key={index}
            coordinate={property}
            title={property.title}
            pinColor="yellow"
          />
        )
      }
    }) : null;

    const menuButton = showAddButtons && (
      <TouchableOpacity style={styles.menuButton} onPress={() => this._drawer.open()}>
        <Icon name="menu" size={40} color="#000" />
      </TouchableOpacity>
    );

    const infoText = (
      <Text style={styles.infoText} center subtitle>{displayText}</Text>
    );

    const qualityCircle = showAddButtons && rating && (
      <TouchableOpacity style={[styles.qualityCircle, { backgroundColor: color }]} onPress={this.toggleAir}>
        <Text subtitle white center>{`${rating} / 100`}</Text>
      </TouchableOpacity>
    );

    const propertyButton = showAddButtons && (
      <TouchableOpacity style={styles.propertyButton} onPress={this.pickProperty}>
        <Icon name="home-plus" color="#000" size={24} />
      </TouchableOpacity>
    );

    const fireButton = showAddButtons && (
      <TouchableOpacity style={styles.fireButton} onPress={this.pickFire}>
        <Icon name="fire" color="#fff" size={24} />
      </TouchableOpacity>
    );

    const cancelButton = showPicker && (
      <TouchableOpacity style={styles.fireButton} onPress={this.cancelPick}>
        <Icon name="close" color="#fff" size={24} />
      </TouchableOpacity>
    );

    const pickButton = showPicker && (
      <TouchableOpacity style={styles.pickButton} onPress={this.pickLocation}>
        <Icon name="check" color="#000" size={24} />
      </TouchableOpacity>
    );

    const picker = showPicker && (
      <View style={styles.picker}>
        <Icon name="map-marker" size={48} />
      </View>
    );

    const textBox = showTextBox && (
      <View style={styles.inputContainerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={this.onChangeText}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );

    const airDetails = showAirDetails && (
      <View style={styles.airDetails}>
        <Text h6>{rating} / 100, {description}</Text>
        <Text subtitle>Main pollutant: {pollutant}</Text>
        <Text body>{recommendation}</Text>
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
            showsMyLocationButton={false}
            rotateEnabled={false}
            pitchEnabled={false}
            initialRegion={this._initialRegion}
            minZoomLevel={6}
            maxZoomlevel={16}
            onRegionChangeComplete={this.fetchConditionsForLocation}
          >
            {mapCircles}
            {mapMarkers}
            {propertyMarkers}
          </MapView>
          {infoText}
          {menuButton}
          {qualityCircle}
          {picker}
          {propertyButton}
          {fireButton}
          {cancelButton}
          {pickButton}
          {textBox}
          {airDetails}
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
  },
  infoText: {
    position: "absolute",
    top: 92,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  picker: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  qualityCircle: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  propertyButton: {
    position: "absolute",
    bottom: 16,
    right: 88,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 25                                                                                                     ,
  },
  fireButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E90000",
    elevation: 10,
  },
  pickButton: {
    position: "absolute",
    bottom: 88,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 25
  },
  inputContainerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 128,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "60%",
    height: 48,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DBDBDB",
    paddingHorizontal: 8,
  },
  inputText: {
    color: "#212121",
    fontSize: 14,
    letterSpacing: 0.25,
  },
  airDetails: {
    position: "absolute",
    top: 92,
    left: 16,
    right: 16,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default HomeScreen;
