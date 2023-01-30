import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";

import { RegisterApi } from "../../Api/User";
import { FormStyle } from "../../Styles";

export default function RegisterForm({ changeForm }) {
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const showPassword = () => hidePassword ? setHidePassword(false) : setHidePassword(true);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await RegisterApi(formData);
        if (response.error) throw "Correo o usuario ya existen";
        Toast.show("Tu cuenta ha sido creada", {
          position: Toast.positions.CENTER,
        });
        changeForm(true);
      } catch (error) {
        setLoading(false);
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
    },
  });
  return (
    <View>
      <TextInput
        label="Correo"
        style={FormStyle.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
        theme={FormStyle.themeInput}
        placeholder="Ingresa tu correo"
      />

      
      <TextInput
        label="Alias"
        style={[FormStyle.input /* ,{display:"none"} */]}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
        theme={FormStyle.themeInput}
        placeholder="Ingresa tu alias"
      />
      <TextInput
        label="Contraseña"
        style={FormStyle.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        theme={FormStyle.themeInput}
        placeholder="Ingresa una contraseña segura"
        secureTextEntry={hidePassword ? false : true}
        right={
          <TextInput.Icon
            icon={hidePassword ? "eye-off" : "eye"}
            size={30}
            onPress={() => showPassword()}
          />
        }
      />
      <Text style={styles.passwordHelp}>
        Almenos 8 caracteres, 1 Mayúscula, 1 minúscula, 1 número y un caracter
        especial{" "}
      </Text>
      <TextInput
        label="Repetir Contraseña"
        style={FormStyle.input}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
        theme={FormStyle.themeInput}
        placeholder="Ingresa una contraseña segura"
        secureTextEntry={hidePassword ? false : true}
        right={
          <TextInput.Icon
            icon={hidePassword ? "eye-off" : "eye"}
            size={30}
            onPress={() => showPassword()}
          />
        }
      />
      <Button
        mode="contained"
        style={FormStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>
      <Button
        mode="text"
        style={FormStyle.btnText}
        labelStyle={FormStyle.btnTextLabel}
        onPress={changeForm}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string()
      .required(true)
      .matches(
        /^(?=.*[^A-Za-z0-9]+)(?=.{8,})/,
        "Almenos 8 caracteres, 1 Mayúscula, 1 minúscula, 1 número y un caracter especial"
      ),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}

/* function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
 */
const styles = StyleSheet.create({
  passwordHelp: {
    marginTop: -20,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: "bold",
  },
});
