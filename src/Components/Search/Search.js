import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../../Styles/Colors";

export default function Search() {
  return (
    <View style={styles.container}>
      {/* <View> */}
        <Searchbar placeholder="Buscar Producto..." />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
});
