import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import notFound from "../../../assets/not-found.png";

export default function ResultNotFound({ search }) {
  return (
    <View style={styles.container}>
      <Image style={styles.notFoundImage} source={notFound} />
      <Text style={styles.searchText}>Sin resultados para {search}</Text>
      <Text style={styles.otherText}>
        Talvez lo escribiste mal o intenta buscando una palabra clave
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    textAlign: "center",
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  otherText: {
    fontSize: 14,
    paddingTop: 5,
  },
  notFoundImage: {
    marginTop: 20,
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
    opacity: 0.5,
  },
});
