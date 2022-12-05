import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { map } from "lodash";

import Loading from "../Loading";
import { getProductApi } from "../../Api/Product";
import Product from "./Product";
import CalcPrice from "../Product/CalcPrice";

export default function ProductList({
  cart,
  products,
  setProducts,
  setReloadCart,
  setTotalPayment,
}) {
  useEffect(() => {
    setProducts(null);
    (async () => {
      const productTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
        const price = CalcPrice(
          response.data.attributes.price,
          response.data.attributes.discount
        );
        totalPaymentTemp += price * response.quantity;
      }
      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
      setReloadCart(false);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Productos: </Text>
      {!products ? (
        <Loading text="Cargando carrito" size="large" />
      ) : (
        map(products, (product) => (
          <Product
            key={product.data.id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))
      )}
      {/*  {products &&
        map(products, (product) => (
          <Product
            key={product.data.id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))} */}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
