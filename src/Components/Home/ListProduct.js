import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListProduct({ products }) {
  const navigation = useNavigation();

  const gotoProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };

  return (
    <View style={styles.container}>
      {map(products.data, (product) => (
        <TouchableWithoutFeedback
          key={product.id}
          onPress={() => gotoProduct(product.id)}
        >
          <View style={styles.containerProduct}>
            <View style={styles.product}>
              <Image
                style={styles.image}
                source={{
                  uri: `${product.attributes.images.data[0].attributes.formats.small.url}`,
                }}
              />
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {product.attributes.title}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: -3,
  },
  containerProduct: {
    width: "50%",
    padding: 3,
  },
  product: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  image: {
    height: 150,
    resizeMode: "contain",
    borderRadius: 20,
  },
  name: {
    marginTop: 15,
    fontSize: 15,
  },
});
