import React from "react";
import { View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { makeRedirectUri } from "expo-auth-session";

import { googleUserInfo, RegisterApi, LoginApi } from "../../Api/User";
import useAuth from "../../Hooks/useAuth";
import { FormStyle } from "../../Styles";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const { login } = useAuth();
  const [request, fullResult, promptAsync] = Google.useAuthRequest(
    {
      expoClientId:
        "your-own-id",
      iosClientId:
        "your-own-id",

      androidClientId:
        "your-own-id",
      webClientId:
        "your-own-id",
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
    },
    {
      useProxy: true,
    }
  );

  const handleGoogleAuth = async () => {
    const result = await promptAsync();
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
          const loginFirst = await LoginApi({
            identifier: email,
            password: id,
          });
          login(loginFirst);
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
  );
}
