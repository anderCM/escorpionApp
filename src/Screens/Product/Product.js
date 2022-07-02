import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { getProductApi } from "../../Api/Product";
import StatusBarCustom from "../../Components/StatusBar";
import Search from "../../Components/Search/Search";
import Loading from "../../Components/Loading";
import CarouselImage from "../../Components/Product/CarouselImage";
import Price from "../../Components/Product/Price";
import Quantity from "../../Components/Product/Quantity";
import Buy from "../../Components/Product/Buy";
import colors from "../../Styles/Colors";
import Favorite from "../../Components/Product/Favorite";

export default function Product({ route }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { idProduct } = route.params;
  useEffect(() => {
    (async () => {
      const response = await getProductApi(idProduct);
      setProduct(response);
    })();
  }, [route.params]);
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
            {/*             <Buy product={product} quantity={quantity} />
            <Favorite product={product} /> */}
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
  },
});
