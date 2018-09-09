import React, { Component } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient from "react-native-linear-gradient";
import TextBox from "../components/TextBox";
import Text from "../components/Text";
import TouchableText from "../components/TouchableText";
import bottle from "../bottle";

class LoginScreen extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  updateEmail = (email) => {
    this.setState({ email });
  };

  updatePassword = (password) => {
    this.setState({ password })
  };

  login = async () => {
    const result = await bottle.authManager.login(this.state);
    if (!result) {
      return;
    }
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <LinearGradient
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#E90000", "#EF5350", "#E90000"]}
        style={styles.container}
      >
        <View style={styles.row}>
          <Text h4 white>Log In</Text>
          <TouchableText white>Sign Up</TouchableText>
        </View>
        <TextBox
          style={styles.textBox}
          caption="Email"
          onChangeText={this.updateEmail}
        />
        <TextBox
          style={styles.textBox}
          caption="Password"
          onChangeText={this.updatePassword}
          password
        />
        <View style={styles.filler} />
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback onPress={this.login}>
            <View style={styles.button}>
              <Icon name="chevron-right" size={24} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  textBox: {
    marginVertical: 16,
  },
  filler: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#EF5350",
  }
});

export default LoginScreen;
