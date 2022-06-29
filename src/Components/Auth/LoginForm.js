import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";

import useAuth from "../../Hooks/useAuth";
import { LoginApi } from "../../Api/User";
import { FormStyle } from "../../Styles";

export default function LoginForm({ changeForm }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await LoginApi(formData);
        console.log(response);
        if (response.statusCode) throw "Usuario o contraseña inválido";
        login(response);
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });
  return (
    <View>
      <TextInput
        label="Correo o nombre de Usuario"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        onChangeText={(text) => formik.setFieldValue("identifier", text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
        placeholder="ejemplo@ejemplo.com - pepe14"
      />
      <TextInput
        label="Contraseña"
        style={FormStyle.input}
        theme={FormStyle.themeInput}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={FormStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Iniciar Sesión
      </Button>
      <Button
        mode="text"
        style={FormStyle.btnText}
        labelStyle={FormStyle.btnTextLabel}
        onPress={changeForm}
      >
        Registrarse
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}
function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
