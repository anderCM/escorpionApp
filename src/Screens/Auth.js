import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import GoogleAuth from "../Components/Auth/GoogleAuth";
/* import AppleAuth from "../Components/Auth/AppleAuth"; */
/* import FacebookAuth from "../Components/Auth/FacebookAuth"; */
import logo from "../../assets/logo.png";
import { LayoutStyle } from "../Styles";


WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const changeForm = () => setShowLogin(!showLogin);

  return (
    <View style={LayoutStyle.container}>
      <Image style={styles.logo} source={{ uri: "https://storage.googleapis.com/bucket-strapi-e-commerce/logo_894fe1d637/logo_894fe1d637.jpeg?updated_at=2023-01-17T13:38:19.651Z" }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
        {Platform.OS == 'android' ? (
          <>
            <View style={styles.oContainer}>
              <Text>O</Text>
            </View>
            <GoogleAuth />
          </>
        ) : ''}
        {/* <AppleAuth /> */}
        {/* <FacebookAuth /> */}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  oContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
});
