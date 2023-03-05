import React from 'react';
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationButton } from "expo-apple-authentication";
import { View } from 'react-native';
import Toast from 'react-native-root-toast';

import { RegisterApi, LoginApi } from '../../Api/User';
import useAuth from '../../Hooks/useAuth';
import { FormStyle } from '../../Styles';

export default function AppleAuth() {
    const handleAppleAuth = async () => {
        try {
            const appleCredentials = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                AppleAuthentication.AppleAuthenticationScope.USER],
            });
            const name = appleCredentials.fullName.givenName;
            const email = appleCredentials.email;
            const userId = appleCredentials.user;

            const responseRegister = await RegisterApi({
                email,
                username: name,
                password: userId,
                repeatPassword: userId,
            });
            const loginFirst = await LoginApi({
                identifier: email,
                password: userId,
            });
            login(loginFirst);
        } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
                Toast.show("Cancelaste inicio de sesión con APPLE", {
                    position: Toast.positions.CENTER,
                });
            } else {
                console.log(e);
            }
        }
    }
    return (
        <AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={FormStyle.btnSuccess}
            onPress={handleAppleAuth}
        />
    )
}
