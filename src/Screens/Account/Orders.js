import React, { useState, useCallback } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import StatusBar from "../../Components/StatusBar";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";

import Loading from "../../Components/Loading";
import ListOrder from "../../Components/Order/ListOrder";
import useAuth from "../../Hooks/useAuth";
import { getOrdersApi } from "../../Api/Orders";
import colors from "../../Styles/Colors";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getOrdersApi(auth);
        setOrders(response.data);
      })();
    }, [])
  );

  return (
    <>
      <StatusBar />
      <ScrollView style={styles.container}>
        {!orders ? (
          <Loading
            text="Cargando Pedidos"
            size="large"
            color={colors.primary}
          />
        ) : size(orders) == 0 ? (
          <Text style={styles.noOrderText}>No tienes pedidos</Text>
        ) : (
          <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10 },
  noOrderText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
});
