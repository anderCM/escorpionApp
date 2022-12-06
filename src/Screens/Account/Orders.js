import React, { useState, useCallback } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import StatusBar from "../../Components/StatusBar";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";

import Loading from "../../Components/Loading";
import ListOrder from "../../Components/Order/ListOrder";
import useAuth from "../../Hooks/useAuth";
import { getOrdersApi } from "../../Api/Orders";
import favoriteBox from "../../../assets/favorite.png";

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
          <Loading text="Cargando Pedidos" size="large" />
        ) : size(orders) == 0 ? (
          <View style={styles.noOrderContainer}>
            <Image style={styles.orderIcon} source={favoriteBox} />
            <Text style={{ textAlign: "center" }}>
              Aún no tienes pedidos realizados
            </Text>
          </View>
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
  noOrderContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  orderIcon: {
    marginTop: 20,
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
    opacity: 0.5,
  },
});
