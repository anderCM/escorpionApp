import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserInfo({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, </Text>
      <Text style={styles.titleName}>
        {user.name && user.lastname
          ? `${user.name} ${user.lastname}`
          : `${user.username}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
