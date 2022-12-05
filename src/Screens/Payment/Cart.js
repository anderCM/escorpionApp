import React, { useState, useCallback, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";

import useAuth from "../../Hooks/useAuth";
import { getProductCartApi } from "../../Api/Cart";
import StatusBarCustom from "../../Components/StatusBar";
import colors from "../../Styles/Colors";
import NotProducts from "../../Components/Cart/NotProducts";
import ProductList from "../../Components/Cart/ProductList";
import { getAddressesApi } from "../../Api/Address";
import AdressList from "../../Components/Cart/AdressList";
import Payment from "../../Components/Cart/Payment";
import { savePayment } from "../../Api/Cart";

export default function Cart({ route }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setAddresses(null);
      setSelectedAddress(null);

      loadCart();
      loadAddresses();
    }, [])
  );

  useEffect(() => {
    if (route.params?.payment) {
      setPaymentStatus(route.params.payment);
      Toast.show(`Tu pago se encuentra ${route.params.payment}`, {
        position: Toast.positions.CENTER,
      });
      if (route.params.payment == "Aprobado") {
        (async () => {
          const response = await savePayment(
            auth,
            route.params.idPayment,
            products,
            route.params.address
          );
          console.log(response);
        })();
      }
      route.params.payment = false;
    }
  }, [route.params?.payment]);

  useEffect(() => {
    reloadCart && loadCart();
  }, [reloadCart]);

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response.data);
  };

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
      <Text style={styles.title}>Carrito de Compras</Text>
      {!cart || size(cart) === 0 ? (
        <NotProducts />
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
            <AdressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </ScrollView>
          <Payment
            totalPayment={totalPayment}
            products={products}
            selectedAddress={selectedAddress}
            paymentStatus={paymentStatus}
          />
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 10,
  },
});