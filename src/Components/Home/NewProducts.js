import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { getLastProductsApi } from "../../Api/Product";
import ListProduct from "./ListProduct";

export default function NewProducts() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi();
      setProducts(response);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos Productos</Text>
      {products && <ListProduct products={products} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
