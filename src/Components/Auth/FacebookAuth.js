import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

import useAuth from "../../Hooks/useAuth";
import { FormStyle } from "../../Styles";

WebBrowser.maybeCompleteAuthSession();
export default function FacebookAuth() {
  const [request, fullResult, promptAsync] = Facebook.useAuthRequest(
    {
      clientId: "yourId",
      scopes: ["public_profile", "email"],
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
    },
    {
      useProxy: true,
    }
  );

  const handleFacebookAuth = async () => {
    const response = await promptAsync();
    if (response?.type === "success") {
      const { accessToken } = response.authentication;
      console.log(accessToken);
    }
  };
  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Button
          icon="facebook"
          mode="contained"
          style={FormStyle.btnSuccess}
          onPress={() => {
            handleFacebookAuth();
          }}
        >
          Ingresar con Facebook
        </Button>
      </View>
    </>
  );
}
