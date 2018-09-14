import React, { Component } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import TextBox from "../components/TextBox";

class SignupScreen extends Component {

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
      <View style={styles.container}>
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
        <TouchableNativeFeedback style={styles.buttonContainer} onPress={() => {}}>
          <View style={styles.button}>
            <Icon name="chevron-right" size={24} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
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

export default SignupScreen;
