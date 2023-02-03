import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../Hooks/useAuth";
import { getProductCartApi, savePayment, deleteCartApi } from "../../Api/Cart";
import StatusBarCustom from "../../Components/StatusBar";
import Search from "../../Components/Search/Search";
import NotProducts from "../../Components/Cart/NotProducts";
import ProductList from "../../Components/Cart/ProductList";
import { getAddressesApi } from "../../Api/Address";
import { getMeApi } from "../../Api/User";
import AdressList from "../../Components/Cart/AdressList";
import Payment from "../../Components/Cart/Payment";
import colors from "../../Styles/Colors";

export default function Cart({ route }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const navigation = useNavigation();
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

  const checkPayment = () => {
    if (route.params?.payment) {
      Toast.show(`Tu pago se encuentra ${route.params?.payment}`, {
        position: Toast.positions.CENTER,
      });
      if (route.params.payment == "Aprobado") {
        (async () => {
          const onSiteAddress = {
            attributes:{
              address: 'Jr. Andahuaylas 256',
              city: 'Lima',
              district: 'La Victoria',
              reference: 'Entre Jr. Antonio Raimondi y Jr. García Naranjo',
              title: 'Tienda Escorpión',
              name_lastname: !route.params.address?.attributes.name_lastname ? "Nombre quien recoge producto no ingresado" : route.params.address.attributes.name_lastname,
              phone: !route.params.address?.attributes.phone ? 11111111 : route.params.address.attributes.phone
            }
          }
          const userInfo = await getMeApi(auth.token);
          const { email } = userInfo;
          const response = await savePayment(
            auth,
            route.params.idPayment,
            products,
            /* route.params.address */
            onSiteAddress,
            email
          );
          if (size(response) > 0) {
            await deleteCartApi();
            navigation.navigate("accountApp", { screen: "my-orders" });
          } else {
            Toast.show("Error al realizar el pedido", {
              position: Toast.positions.CENTER,
            });
          }
        })();
      }
    }
  };
  useMemo(() => checkPayment(), [route.params?.payment]);
  /*   useEffect(() => {
    setPaymentStatus(route.params?.payment);
    console.log(`1: ${paymentStatus}`);
    if (route.params?.payment) {
      console.log(`2: ${paymentStatus}`);
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
          if (size(response) > 0) {
            await deleteCartApi();
            navigation.navigate("accountApp", { screen: "my-orders" });
          } else {
            Toast.show("Error al realizar el pedido", {
              position: Toast.positions.CENTER,
            });
          }
        })();
      }
      route.params.payment = false;
    }
  }, [route.params?.payment]); */

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

      {!cart || size(cart) === 0 ? (
        <>
          <Search />
          <NotProducts />
        </>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <Text style={styles.title}>Carrito de Compras</Text>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
            {/* <AdressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              from="cart"
            /> */}
          </ScrollView>
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>
              Por el momento todos los pedidos serán entregados en tienda
            </Text>
          </View>
          <Payment
            totalPayment={totalPayment}
            products={products}
            selectedAddress={selectedAddress}
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
  alertBox: {
    backgroundColor: "#FF8E9E",
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderRadius: 5,
  },
  alertText: {
    fontWeight: "bold",
  },
});
