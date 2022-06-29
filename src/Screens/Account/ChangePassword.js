import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";

import useAuth from "../../Hooks/useAuth";
import { updateUserApi } from "../../Api/User";
import { FormStyle } from "../../Styles";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.error) throw "Error al cambiar la contraseña";
        Toast.show("Contraseña actualizada correctamente", {
          position: Toast.positions.CENTER,
        });
        navigation.goBack();
        /* logout(); */
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
      setLoading(false);
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        label="Nueva contraseña"
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        placeholder="8 caracteres mínimo"
        secureTextEntry
      />
      <TextInput
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        label="Repetir contraseña"
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={FormStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar contraseña
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(8, true).required(true),
    repeatPassword: Yup.string()
      .min(8, true)
      .oneOf([Yup.ref("password")], true)
      .required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
