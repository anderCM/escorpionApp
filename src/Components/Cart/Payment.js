import "react-native-get-random-values";
import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";

import { createPayment } from "../../Api/Cart";
import useAuth from "../../Hooks/useAuth";
import { FormStyle } from "../../Styles";
import colors from "../../Styles/Colors";

export default function Payment({
  selectedAddress,
  products,
  totalPayment,
  paymentStatus,
}) {
  const [loading, setLoading] = useState(false);
  let newPrice = parseFloat(totalPayment).toFixed(2);
  const { auth } = useAuth();
  const navigation = useNavigation();
  //DO NOT DELETE TO IN FUTURE IMPLEMENT LOCAL PAYMENT WHEN ANY ONLINE PAYMENT SUPPORTS IT
  /*   const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      try {
        payCart = await paymentCartApi(
          auth,
          "asdasdi-213912jkdaskdsa-21312312",
          products,
          selectedAddress
        );
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  }); */

  const handlePay = async () => {
    setLoading(true);
    try {
      const paymentInfo = await createPayment(auth, products, selectedAddress);
      if (!paymentInfo.client_id) {
        Toast.show("Error Con proveedor de pago", {
          position: Toast.positions.CENTER,
        });
        return;
      }
      const clientId = paymentInfo.client_id;
      const idRequestPayment = paymentInfo.id;
      const paymentUrl = paymentInfo.init_point;

      navigation.navigate("checkout", {
        url: paymentUrl,
        idPayment: idRequestPayment,
        address: selectedAddress,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/*
      //DO NOT DELETE TO IN FUTURE IMPLEMENT LOCAL PAYMENT WHEN ANY ONLINE PAYMENT SUPPORTS IT
      <Text style={styles.containerTitle}>Realizar Pago</Text>
      <TextInput
        left={<TextInput.Icon name={"account"} color={colors.primary} />}
        label="Nombre de la tarjeta"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        left={<TextInput.Icon name={"credit-card"} color={colors.primary} />}
        label="Número de la tarjeta"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        keyboardType="numeric"
        maxLength={16}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYear}>
          <TextInput
            left={
              <TextInput.Icon name={"calendar-month"} color={colors.primary} />
            }
            label="Mes"
            style={styles.inputDate}
            theme={FormStyle.themeInput}
            maxLength={2}
            keyboardType="numeric"
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            left={
              <TextInput.Icon
                name={"calendar-multiple"}
                color={colors.primary}
              />
            }
            label="Año"
            style={styles.inputDate}
            theme={FormStyle.themeInput}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          left={
            <TextInput.Icon name={"credit-card-lock"} color={colors.primary} />
          }
          label="CVV/CVC"
          theme={FormStyle.themeInput}
          style={styles.inputCvc}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View> */}
      <Button
        mode="contained"
        contentStyle={FormStyle.btnSuccess}
        labelStyle={FormStyle.btnText}
        onPress={/* formik.handleSubmit */ () => handlePay()}
        loading={loading}
      >
        Pagar {totalPayment && `(S/. ${newPrice})`}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerMonthYear: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  inputCvc: {
    width: "40%",
  },
  containerWebView: {
    flex: 1,
    alignItems: "center",
  },
  paymentForm: {
    width: 200,
    height: 200,
    backgroundColor: colors.primary,
  },
});

//DO NOT DELETE TO IN FUTURE IMPLEMENT LOCAL PAYMENT WHEN ANY ONLINE PAYMENT SUPPORTS IT
function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().min(16, true).max(16, true).required(true),
    exp_month: Yup.string().min(1, true).max(2, true).required(true),
    exp_year: Yup.string().min(2, true).max(2, true).required(true),
    cvc: Yup.string().min(3, true).max(3, true).required(true),
    name: Yup.string().min(4, true).required(true),
  };
}
