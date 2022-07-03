import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { map, size } from "lodash";
import Product from "./Product";

export default function FavoriteList({ products, setReloadFavorites }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>LISTA DE FAVORITOS</Text>
      {map(products.data, (product) => (
        <Product
          key={product.id}
          product={product}
          setReloadFavorites={setReloadFavorites}
        />
      ))}
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
