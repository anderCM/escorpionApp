import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountStack from "./AccountStack";
import ProductStack from "./ProductStack";  
import colors from "../Styles/Colors";
import Favorites from "../Screens/Favorites";
import PaymentStack from "./PaymentStack";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#000957"
        barStyle={styles.navigaton}
        screenOptions={({ route }) => ({
          tabBarIcon: (color) => {
            return setIcon(route, color);
          },
        })}
      >
        <Tab.Screen
          name="homeApp"
          component={ProductStack}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="payment"
          component={PaymentStack}
          options={{ title: "Carrito" }}
        />
        <Tab.Screen
          name="accountApp"
          component={AccountStack}
          options={{ title: "Mi Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "homeApp":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "payment":
      iconName = "cart";
      break;
    case "accountApp":
      iconName = "account";
      break;
    default:
      break;
  }
  return <MaterialCommunityIcons name={iconName} size={20} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigaton: {
    backgroundColor: colors.primary,
  },
  icon: {
    color: colors.bgIcon,
  },
});
