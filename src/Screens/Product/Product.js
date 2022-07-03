import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getProductApi } from "../../Api/Product";
import StatusBarCustom from "../../Components/StatusBar";
import Search from "../../Components/Search/Search";
import Loading from "../../Components/Loading";
import CarouselImage from "../../Components/Product/CarouselImage";
import Price from "../../Components/Product/Price";
import Quantity from "../../Components/Product/Quantity";
import colors from "../../Styles/Colors";

export default function Product({ route }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { idProduct } = route.params;
  useEffect(() => {
    setProduct(null);
    (async () => {
      const response = await getProductApi(idProduct);
      setProduct(response);
    })();
  }, [route.params]);

  const currentSeason = (season) => {
    const newText = season.toLowerCase();
    let icon = "";
    switch (newText) {
      case "invierno":
        icon = "weather-snowy-rainy";
        break;
      case "verano":
        icon = "weather-sunny";
        break;
      case "primavera":
        icon = "flower-outline";
        break;
      case "primavera":
        icon = "tree-outline";
        break;
      default:
        icon = "snowman";
        break;
    }
    return icon;
  };

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.primary}
        barstyle="light-content"
      />
      <Search />

      {!product ? (
        <Loading text="Cargando Producto" size="large" color={colors.primary} />
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{product.data.attributes.title}</Text>
          <CarouselImage images={product.data.attributes.images.data} />
          <View style={styles.containerView}>
            <Price
              price={product.data.attributes.price}
              discount={product.data.attributes.discount}
            />
            <Quantity
              quantity={quantity}
              setQuantity={setQuantity}
              product={product}
            />
          </View>
          <View style={styles.containerDescription}>
            <Text style={styles.description}>
              {product.data.attributes.description}
            </Text>
            <View style={styles.moreInfoContainer}>
              <Text style={styles.textSize}>
                <MaterialCommunityIcons
                  name="bed-king"
                  size={18}
                  color={colors.priceLast}
                />
                {product.data.attributes.size}
              </Text>
              <Text style={styles.textSize}>
                <MaterialCommunityIcons
                  name={currentSeason(product.data.attributes.season)}
                  size={18}
                  color={colors.priceLast}
                />
                {product.data.attributes.season}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
    padding: 10,
  },
  containerView: {
    padding: 10,
    paddingTop: 0,
  },
  containerDescription: {
    padding: 10,
  },
  description: {
    color: colors.priceLast,
    fontSize: 16,
    textAlign: "justify",
  },
  moreInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical:10
  },
  textSize: {
    fontSize: 20,
    color: colors.priceLast,
  },
});
