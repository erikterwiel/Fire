import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import TextButton from "./TouchableText";

class TextBox extends Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
    };
  }

  onShowPress = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    const { onChangeText, onSubmitEditing, caption, hint, style, password, inputRef, ...props } = this.props;
    return (
      <View style={style}>
        <View style={styles.row}>
          <Text white h6>{caption}</Text>
          {password &&
          <TextButton white button uppcase onPress={this.onShowPress}>
            {this.state.hidePassword ? "Show" : "Hide"}
          </TextButton>
          }
        </View>
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            style={styles.text}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={hint}
            underlineColorAndroid="transparent"
            secureTextEntry={password && this.state.hidePassword}
            {...props}
          />
        </View>
        <View style={styles.underline} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginBottom: 4,
  },
  container: {
    width: "100%",
    height: 48,
  },
  text: {
    color: "white",
    fontSize: 20,
    letterSpacing: 0.15,
  },
  underline: {
    height: 2,
    width: "100%",
    backgroundColor: "#E57373",
  },
});

export default TextBox;
