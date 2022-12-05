import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Checkout from "../Screens/Payment/Checkout";
import Cart from "../Screens/Payment/Cart";

import colors from "../Styles/Colors";

const Stack = createStackNavigator();

export default function PaymentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.primary },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
