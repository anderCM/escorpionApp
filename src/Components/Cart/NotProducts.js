import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CartImage from "../../../assets/cart.png";
import colors from "../../Styles/Colors";

export default function NotProducts() {
  return (
    <View style={styles.container}>
      <Image style={styles.notFoundImage} source={CartImage} />
      <Text style={styles.title}>Parece que tu carrito está vacío</Text>
      <Text style={styles.text}>
        Mira nuestros productos y presiona el ícono
        <MaterialCommunityIcons
          name="cart"
          size={24}
          color={colors.primary}
        />{" "}
        para agregarlos{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
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
