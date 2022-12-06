import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { useFocusEffect } from "@react-navigation/native";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../Hooks/useAuth";
import { updateUserApi } from "../../Api/User";
import { getMeApi } from "../../Api/User";
import { FormStyle } from "../../Styles";

export default function ChangeName() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        if (response.name && response.lastname) {
          await formik.setFieldValue("name", response.name);
          await formik.setFieldValue("lastname", response.lastname);
        }
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const rpta = await updateUserApi(auth, formData);
        Toast.show("Datos actualizados correctamente", {
          position: Toast.positions.CENTER,
        });
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al actualizar los datos", {
          position: Toast.positions.CENTER,
        });
      }
      setLoading(false);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Apellidos"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      />
      <Button
        mode="contained"
        style={FormStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar Nombre y Apellidos
      </Button>
    </View>
  );
}
function initialValues() {
  return {
    name: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
