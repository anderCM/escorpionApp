import React from "react";
import { View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";

import { googleUserInfo, RegisterApi, LoginApi } from "../../Api/User";
import useAuth from "../../Hooks/useAuth";
import { FormStyle } from "../../Styles";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const { login } = useAuth();
  const [request, fullResult, promptAsync] = Google.useAuthRequest(
    {
     
    },
    {
      useProxy: true,
    }
  );

  const handleGoogleAuth = async () => {
    const result = await promptAsync(/* { useProxy: true } */);
    if (result?.type === "success") {
      const { authentication } = result;
      const token = authentication.accessToken;
      const user = await googleUserInfo(token);
      if (user?.id) {
        const { id, email, given_name } = user;
        try {
          const responseRegister = await RegisterApi({
            email,
            username: given_name,
            password: id,
            repeatPassword: id,
          });
          if (responseRegister.error) {
            const responseLogin = await LoginApi({
              identifier: email,
              password: id,
            });
            login(responseLogin);
            return;
          }
          Toast.show("Tu cuenta ha sido creada", {
            position: Toast.positions.CENTER,
          });
        } catch (error) {
          Toast.show(error, {
            position: Toast.positions.CENTER,
          });
        }
        return;
      }
      Toast.show("Error al conectar con Google", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <>
      <>
        <View>
          <Button
            icon="google"
            mode="contained"
            style={FormStyle.btnSuccess}
            onPress={() => {
              handleGoogleAuth();
            }}
          >
            Ingresar con Google
          </Button>
        </View>
      </>
    </>
  );
}
