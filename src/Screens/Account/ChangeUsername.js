import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import Toast from "react-native-root-toast";

import { getMeApi, updateUserApi } from "../../Api/User";
import useAuth from "../../Hooks/useAuth";
import { FormStyle } from "../../Styles";

export default function ChangeUsername() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        await formik.setFieldValue("username", response.username);
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "Este Alias ya existe";
        Toast.show("Alias cambiado correctamente", {
          position: Toast.positions.CENTER,
        });
        navigation.goBack();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        formik.setFieldError("username", true);
      }
      setLoading(false);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Alias"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        placeholder="3 caracteres mínimo"
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <Button
        mode="contained"
        style={FormStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar Nombre de usuario
      </Button>
    </View>
  );
}
function initialValues() {
  return {
    username: "",
  };
}
function validationSchema() {
  return {
    username: Yup.string().min(3, true).required(true),
  };
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
