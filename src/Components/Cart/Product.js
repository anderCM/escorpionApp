import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { SERVER_RESOURCERS } from "../../Utils/Constans";
import colors from "../../Styles/Colors";
import CalcPrice from "../Product/CalcPrice";
import {
  decreaseProductCartApi,
  deleteProductCartApi,
  inCreaseProductCartApi,
} from "../../Api/Cart";
import { size } from "../../Styles/sizes";

export default function Product({ product, setReloadCart }) {
  const navigation = useNavigation();
  /*   const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(product.quantity);
  }, []); */

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product.data.id);
    if (response) setReloadCart(true);
  };

  const inCreaseProductCart = async () => {
    const response = await inCreaseProductCartApi(product.data.id);
    if (response) setReloadCart(true);
    /* if (response) setQuantity(quantity + 1); */
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product.data.id);
    if (response) setReloadCart(true);
    /*  if (response) setQuantity(quantity - 1); */
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() => goToProduct(product.data.id)}
    >
      <View style={styles.containerImage} key={product.data.id}>
        <Image
          style={styles.image}
          source={{
            uri: `${SERVER_RESOURCERS}${product.data.attributes.images.data[0].attributes.formats.medium.url}`,
          }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.data.attributes.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              S/.
              {CalcPrice(
                product.data.attributes.price,
                product.data.attributes.discount
              )}
            </Text>
            {product.data.attributes.discount && (
              <Text style={styles.oldPrice}>
                S/. {product.data.attributes.price.toFixed(2)}
              </Text>
            )}
          </View>
          <Text
            style={styles.description}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {product.data.attributes.description}
          </Text>
        </View>
        <View style={styles.btnsContainer}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="minus"
              color="#000"
              size={size.helpingIcons}
              style={styles.btnQuantity}
              onPress={decreaseProductCart}
            />
            <TextInput
              style={styles.inputQuantity}
              value={product.quantity.toString()}
            />
            <IconButton
              icon="plus"
              color="#000"
              size={size.helpingIcons}
              style={styles.btnQuantity}
              onPress={inCreaseProductCart}
            />
          </View>
          <IconButton
            icon="delete"
            color="#000"
            size={size.helpingIcons}
            style={{ backgroundColor: colors.bgLove }}
            onPress={deleteProductCart}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    height: 170,
    backgroundColor: "#ebebeb",
    padding: 5,
    borderRadius: 20,
  },
  image: {
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 20,
  },
  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 18,
    color: "#b12704",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQuantity: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
    borderRadius: 15,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: "#7F8487",
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
});
