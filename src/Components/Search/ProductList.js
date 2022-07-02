import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import ListProduct from "../Home/ListProduct";

export default function ProductList({ products }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultados: </Text>
      <ListProduct products={products} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
