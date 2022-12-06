import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../Screens/Account/Account";
import ChangeName from "../Screens/Account/ChangeName";
import ChangeEmail from "../Screens/Account/ChangeEmail";
import colors from "../Styles/Colors";
import ChangeUsername from "../Screens/Account/ChangeUsername";
import ChangePassword from "../Screens/Account/ChangePassword";
import Addresses from "../Screens/Account/Addresses";
import AddAdress from "../Screens/Account/AddAdress";
import Orders from "../Screens/Account/Orders";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.bgIcon,
        headerStyle: { backgroundColor: colors.primary },
        cardStyle: { backgroundColor: colors.bgLight },
      }}
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta", headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{ title: "Cambiar Nombres y Apellidos" }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{ title: "Cambiar Correo" }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{ title: "Cambiar Alias" }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{ title: "Cambiar Contraseña" }}
      />
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{ title: "Mis direcciones" }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAdress}
        options={{ title: "Agregar dirección" }}
      />
      <Stack.Screen
        name="my-orders"
        component={Orders}
        options={{ title: "Mis Pedidos" }}
      />
    </Stack.Navigator>
  );
}
