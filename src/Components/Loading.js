import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import colors from "../Styles/Colors";

export default function Loading({ text, size, color }) {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={size} color={color} style={styles.loading} />
      <Text style={styles.title}>{text}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});

Loading.defaultProps = {
  text: "Cargando...",
  color: colors.primary,
};
