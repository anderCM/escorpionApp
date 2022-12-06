import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { map } from "lodash";

import Order from "./Order";

export default function ListOrder({ orders }) {
    /* console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(orders); */
  return (
    <View style={styles.container}>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
});
