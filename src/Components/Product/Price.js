import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../../Styles/Colors";
import CalcPrice from "./CalcPrice";

export default function Price({ price, discount }) {
  return (
    <View>
      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}>Antes:</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.dataValue, styles.oldPrice]}>
              S/. {price.toFixed(2)}
            </Text>
            {discount && (
              <Text style={[styles.dataValue, styles.dataSave]}>
                ({discount})%
              </Text>
            )}
          </View>
        </View>
      )}
      <View style={styles.containerData}>
        <Text style={styles.dataText}>{discount ? "Ahora" : "Precio"}:</Text>
        <Text style={[styles.dataValue, styles.currentPrice]}>
          S/. {CalcPrice(price, discount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    /*  alignItems: "center", */
    paddingVertical: 5,
  },
  dataText: {
    /*  width: "50%", */
    fontSize: 18,
    color: "#747474",
    /*     textAlign: "right", */
  },
  dataValue: {
    /* width: "50%", */
    fontSize: 16,
    paddingLeft: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: colors.priceLast,
  },
  currentPrice: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.priceNew,
  },
  dataSave: {
    fontSize: 14,
    paddingLeft: 5,
    color: colors.priceLast,
  },
});
