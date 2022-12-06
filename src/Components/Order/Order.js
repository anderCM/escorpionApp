import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { SERVER_RESOURCERS } from "../../Utils/Constans";

const colorStatus = {
  Entregado: {
    color: "#5BB318",
  },
  Pendiente: {
    color: "#FED049",
  },
  Enviado: {
    color: "#009EFF",
  },
};

export default function Order({ order }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${SERVER_RESOURCERS}${order.attributes.product.data.attributes.images.data[0].attributes.formats.medium.url}`,
          }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
          {order.attributes.product.data.attributes.title}
        </Text>
        <Text>Cantidad: {order.attributes.quantity}</Text>
        <Text>Total Pagado: S/. {order.attributes.productsPayment}</Text>
        <View style={styles.deliveryContainer}>
          <View
            style={[
              styles.deliveryLabel,
              order.attributes.delivered
                ? {
                    backgroundColor:
                      colorStatus[order.attributes.delivered].color,
                  }
                : {
                    backgroundColor: "#FF1E1E",
                  },
            ]}
          >
            {order.attributes.delivered ? (
              <Text>{order.attributes.delivered}</Text>
            ) : (
              <Text>Sin estado</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    flexDirection: "row",
  },
  containerImage: {
    width: "30%",
    height: 120,
    padding: 10,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  info: {
    width: "70%",
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  deliveryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deliveryLabel: {
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 10,
  },
});
