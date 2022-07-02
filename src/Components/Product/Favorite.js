import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../Styles/Colors";

export default function Favorite({ product }) {
  const addFavorite = () => {
    console.log("Añadiendo a favoritos");
    console.log(product.data.attributes.title);
    console.log(product.data.id);
  };

  return (
    <View style={styles.container}>
      <Button contentStyle={styles.btnAddFavoriteContent} onPress={addFavorite}>
        <MaterialCommunityIcons name="heart-plus" size={20} color="black" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingVertical: 5
  },
  btnAddFavoriteContent: {
    backgroundColor: colors.bgLove,
    paddingVertical: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
