import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 320;

const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Setiempre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default function Order({ order }) {
  const originalDate = order.attributes.createdAt.split("T");
  const dateSplit = originalDate[0].split("-");
  const year = dateSplit[0];
  const month = dateSplit[1];
  const day = dateSplit[2];
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${order.attributes.product.data.attributes.images.data[0].attributes.formats.medium.url}`,
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
          <View>
            <Text style={styles.date}>
              <MaterialCommunityIcons name="calendar" color="black" />{" "}
              {`${day} de ${months[month]} del ${year}`}
            </Text>
          </View>
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
              <Text style={styles.date}>{order.attributes.delivered}</Text>
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
    alignItems: "center",
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
    fontSize: normalize(15),
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: normalize(11),
  },
  deliveryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  deliveryLabel: {
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 10,
  },
});
