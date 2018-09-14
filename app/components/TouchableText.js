import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from "./Text";

const TouchableText = ({ children, onPress, style, h5, h6, subtitle, button, uppercase, white }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text
      h5={h5 !== undefined}
      h6={h6 !== undefined}
      subtitle={subtitle !== undefined}
      button={button !== undefined}
      uppercase={uppercase !== undefined}
      white={white !== undefined}
      style={white ? styles.text : null}>
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
});

export default TouchableText;
