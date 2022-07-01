import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Product/Home";
import colors from "../Styles/Colors";
import Product from "../Screens/Product/Product";

const Stack = createStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.primary },
        cardStyle:{
            backgroundColor:colors.bgLight
        }
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
