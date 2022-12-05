import "react-native-get-random-values";
import { WebView } from "react-native-webview";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Checkout({ route }) {
  const { url, idPayment, address } = route.params;
  const [paymentStatus, setPaymentStatus] = useState(route.params.payment);
  const [finishPayment, setFinishPayment] = useState(false);
  const navigation = useNavigation();

  const validatePayment = (status) => {
    const statusUrl = status.url;
    if (statusUrl.includes("/approved/")) {
      setPaymentStatus("Aprobado");
      setFinishPayment(true);
    } else if (statusUrl.includes("/rejected/")) {
      setPaymentStatus("Rechazado");
      setFinishPayment(true);
    } else if (statusUrl.includes("/recover/")) {
      setPaymentStatus("Pendiente");
      setFinishPayment(true);
    }
    finishPayment &&
      navigation.navigate({
        name: "cart",
        params: {
          payment: paymentStatus,
          idPayment: idPayment,
          address: address,
        },
        merge: true,
      });
  };
  return (
    <>
      <View style={styles.container}>
        <WebView
          source={{ uri: url }}
          androidHardwareAccelerationDisabled
          javaScriptEnabled
          onLoadProgress={({ nativeEvent }) => validatePayment(nativeEvent)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
