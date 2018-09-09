import React from 'react';
import { Text as ReactNativeText, StyleSheet } from 'react-native';

const Text = (props) => {
  const {
    children,
    style,
    white,
    red,
    blue,
    center,
    h4,
    h5,
    h6,
    subtitle,
    body,
    caption,
    button,
    uppercase,
  } = props;
  const textStyle = [styles.base, styles.body];
  if (white) {
    textStyle.push(styles.white);
  }
  if (red) {
    textStyle.push(styles.red);
  }
  if (blue) {
    textStyle.push(styles.blue);
  }
  if (center) {
    textStyle.push(styles.center);
  }
  if (h4) {
    textStyle.push(styles.h4);
  }
  if (h5) {
    textStyle.push(styles.h5);
  }
  if (h6) {
    textStyle.push(styles.h6);
  }
  if (subtitle) {
    textStyle.push(styles.subtitle);
  }
  if (body) {
    textStyle.push(styles.body);
  }
  if (caption) {
    textStyle.push(styles.caption);
  }
  if (button) {
    textStyle.push(styles.button);
  }
  textStyle.push(style);
  return (
    <ReactNativeText style={textStyle}>{uppercase !== undefined ? children.toUpperCase() : children}</ReactNativeText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: "#212121",
    fontFamily: "VarelaRound-Regular",
  },
  white: {
    color: "white",
  },
  red: {
    color: "red",
  },
  blue: {
    color: "blue",
  },
  center: {
    textAlign: "center",
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: 24,
    letterSpacing: 0,
  },
  h6: {
    fontSize: 20,
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 0.15,
  },
  body: {
    fontSize: 14,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 14,
    letterSpacing: 0.75,
  },
});

export default Text;
