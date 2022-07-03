import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import useAuth from "../../Hooks/useAuth";
import { deleteFavoriteApi } from "../../Api/Favorite";
import { SERVER_RESOURCERS } from "../../Utils/Constans";
import colors from "../../Styles/Colors";
import CalcPrice from "../Product/CalcPrice";

export default function Product({ product, setReloadFavorites }) {
  const [loading, setLoading] = useState(false);
  const preFix = product.attributes.product.data.attributes;
  const { auth } = useAuth();
  const navigation = useNavigation();

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  const deleteFavorite = async (id) => {
    setLoading(true);
    try {
      await deleteFavoriteApi(auth, id);
      /* Toast.show("Eliminado de Favoritos", {
        position: Toast.positions.CENTER,
      }); */
      setReloadFavorites(true);
    } catch (error) {
      console.log(error);
      Toast.show(error, {
        position: Toast.positions.CENTER,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <TouchableOpacity
          onPress={() => goToProduct(product.attributes.product.data.id)}
        >
          <Image
            style={styles.image}
            source={{
              uri: `${SERVER_RESOURCERS}${preFix.images.data[0].attributes.formats.medium.url}`,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {preFix.title}
          </Text>
          <View style={styles.price}>
            <Text style={styles.currentPrice}>
              S/. {CalcPrice(preFix.price, preFix.discount)}
            </Text>
            {preFix.discount && (
              <Text style={styles.oldPrice}>S/. {preFix.price.toFixed(2)}</Text>
            )}
          </View>
          <Text
            style={styles.description}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {preFix.description}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <IconButton
            icon="eye-plus"
            color="#000"
            size={24}
            style={{ backgroundColor: colors.primary }}
            onPress={() => goToProduct(product.attributes.product.data.id)}
          />
          <IconButton
            icon="delete"
            color="#000"
            size={24}
            style={{ backgroundColor: colors.bgLove }}
            onPress={() => deleteFavorite(product.attributes.product.data.id)}
          />
        </View>
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
    borderRadius: 20,
  },
  containerImage: {
    width: "40%",
    height: 200,
    backgroundColor: "#ebebeb",
    padding: 5,
    borderRadius: 20,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 13,
    color: "#7F8487",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  loading: {
    backgroundColor: "#000",
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
  },
});
