import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient from "react-native-linear-gradient";
import TextBox from "../components/TextBox";
import Text from "../components/Text";
import TouchableText from "../components/TouchableText";

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
          <View style={styles.button}>
            <Icon name="chevron-right" size={24} color="#fff" />
          </View>
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
