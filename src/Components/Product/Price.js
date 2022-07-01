import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../../Styles/Colors";

export default function Price({ price, discount }) {
  const calcPrice = (price, discount) => {
    if (!discount) return price.toFixed(2);
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  return (
    <View>
      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}>Precio Recomendado:</Text>
          <Text style={[styles.dataValue, styles.oldPrice]}>S/. {price.toFixed(2)}</Text>
        </View>
      )}
      <View style={styles.containerData}>
        <Text style={styles.dataText}>Precio:</Text>
        <Text style={[styles.dataValue, styles.currentPrice]}>
          S/. {calcPrice(price, discount)}
        </Text>
      </View>
      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}>Ahorras:</Text>
          <Text style={[styles.dataValue, styles.dataSave]}>
            S/. {((price * discount) / 100).toFixed(2)} ({discount})%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerData: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  dataText: {
    width: "50%",
    fontSize: 18,
    color: "#747474",
    textAlign: "right",
  },
  dataValue: {
    width: "50%",
    fontSize: 18,
    paddingLeft: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: colors.priceLast,
  },
  currentPrice: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.priceNew,
  },
  dataSave: {
    color: "#bc0e0d",
  },
});
