import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../Styles/Colors";

export default function Buy({ product, quantity }) {
  const addProductCart = () => {
    console.log("Product Añadido");
    console.log(product.data.attributes.title);
    console.log(quantity);
  };

  return (
    <View style={styles.container}>
      <Button
        onLongPress={() => console.log("asdsa")}
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        onPress={addProductCart}
        theme="none"
      >
        <MaterialCommunityIcons name="cart" size={24} color="black" />
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingVertical: 5,
  },
  btnBuyContent: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    width: 60,
    height: 60,
    borderRadius: 30, 
    textAlign: "center",
  },
});
