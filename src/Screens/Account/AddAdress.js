import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../Hooks/useAuth";
import { FormStyle } from "../../Styles";
import {
  addAddressApi,
  getExactAddressesApi,
  updateAddressApi,
} from "../../Api/Address";

export default function AddAdress({ route }) {
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState(true);
  const navigation = useNavigation();
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      if (route.params?.idAddress) {
        setNewAddress(false);
        navigation.setOptions({ title: "Actualizar Dirección" });
        const response = await getExactAddressesApi(
          auth,
          route.params.idAddress
        );
        console.log(response);
        const data = response.data;
        formik.setFieldValue("id", data.id);
        formik.setFieldValue("title", data.attributes.title);
        formik.setFieldValue("name_lastname", data.attributes.name_lastname);
        formik.setFieldValue("address", data.attributes.address);
        formik.setFieldValue("city", data.attributes.city);
        formik.setFieldValue("district", data.attributes.district);
        formik.setFieldValue("phone", data.attributes.phone);
        formik.setFieldValue("reference", data.attributes.reference);
      }
    })();
  }, [route.params]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      try {
        if (newAddress) {
          formData.user = auth.idUser;
          const response = await addAddressApi(auth, formData);
          if (response.error) throw "Error al agregar Dirección";
        } else {
          await updateAddressApi(auth, formData);
        }
        navigation.goBack();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
      console.log(formData);
      setLoading(false);
    },
  });

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <View style={styles.container}>
        <Text style={styles.title}>Nueva Dirección</Text>
        <TextInput
          label="Título"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Ej: Mi Trabajo"
          onChangeText={(text) => formik.setFieldValue("title", text)}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <TextInput
          label="¿Quién Recibe?"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Nombre de quien recibe"
          onChangeText={(text) => formik.setFieldValue("name_lastname", text)}
          value={formik.values.name_lastname}
          error={formik.errors.name_lastname}
        />
        <TextInput
          label="Ciudad"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Ej: Lima"
          onChangeText={(text) => formik.setFieldValue("city", text)}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <TextInput
          label="Distrito"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Ej: Lince"
          onChangeText={(text) => formik.setFieldValue("district", text)}
          value={formik.values.district}
          error={formik.errors.district}
        />
        <TextInput
          label="Dirección"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Ej: Av. Los Rosales 1445"
          onChangeText={(text) => formik.setFieldValue("address", text)}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <TextInput
          label="Referencia"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Ej: Al costado de polleria Rocy's en la casa azul"
          onChangeText={(text) => formik.setFieldValue("reference", text)}
          value={formik.values.reference}
          error={formik.errors.reference}
        />
        <TextInput
          label="Teléfono"
          style={FormStyle.input}
          theme={FormStyle.themeInput}
          placeholder="Ej: 987XXX123"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
        <Button
          mode="contained"
          style={[FormStyle.btnSuccess, styles.btnSuccess]}
          onPress={formik.handleSubmit}
          /* labelStyle={FormStyle.btnTextLabel} */
          loading={loading}
        >
          {newAddress ? "Agregar Dirección" : "Actualizar Dirección"}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

function initialValues() {
  return {
    title: "",
    name_lastname: "",
    address: "",
    city: "",
    district: "",
    phone: "",
    reference: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name_lastname: Yup.string().min(3, true).required(true),
    address: Yup.string().min(5, true).required(true),
    city: Yup.string().required(true),
    district: Yup.string().required(true),
    phone: Yup.string().min(7, true).required(true),
    reference: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    textAlign:"center",
    fontWeight:"bold"
  },
  btnSuccess: {
    marginBottom: 20,
  },
});
