import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import AccountStack from "./AccountStack";
import ProductStack from "./ProductStack";
import colors from "../Styles/Colors";
import Favorites from "../Screens/Favorites";
import Cart from "../Screens/Cart";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#000957"
        barStyle={styles.navigaton}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
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
          name="cart"
          component={Cart}
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
    case "cart":
      iconName = "shopping-cart";
      break;
    case "accountApp":
      iconName = "user-circle-o";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigaton: {
    backgroundColor: colors.primary,
  },
  icon: {
    fontSize: 20,
    color: colors.bgIcon,
  },
});
