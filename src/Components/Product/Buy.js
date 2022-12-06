import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import colors from "../../Styles/Colors";
import { addProductCartApi, getProductCartApi } from "../../Api/Cart";

export default function Buy({ product, quantity }) {

  const addProductCart = async () => {
    const response = await addProductCartApi(product.data.id, quantity);
    if (response) {
      Toast.show("Agregado al carrito!", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("Error al añadir al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button
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
