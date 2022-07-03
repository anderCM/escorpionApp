import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";

import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { getFavoritesApi } from "../Api/Favorite";
import Search from "../Components/Search/Search";
import StatusBarCustom from "../Components/StatusBar";
import colors from "../Styles/Colors";
import favoriteBox from "../../assets/favorite.png";
import FavoriteList from "../Components/Favorites/FavoriteList";

export default function Favorites() {
  const [products, setProducts] = useState(null);
  const [reloadFavorites, setReloadFavorites] = useState(false);
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      setProducts(null);
      (async () => {
        const response = await getFavoritesApi(auth);
        setProducts(response);
      })();
      setReloadFavorites(false);
    }, [reloadFavorites])
  );

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
      <Search />
      {!products ? (
        <Loading text="Cargando Favoritos" size="large" />
      ) : size(products.data) === 0 ? (
        <View style={styles.container}>
          <Image style={styles.favoriteIcon} source={favoriteBox} />
          <Text style={styles.title}>Lista de favoritos</Text>
          <Text style={{ textAlign: "center" }}>
            Aún no tienes favoritos en tu lista
          </Text>
        </View>
      ) : (
        <FavoriteList products={products} setReloadFavorites={setReloadFavorites}/>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
    textAlign: "center",
  },
  favoriteIcon: {
    marginTop: 20,
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
    opacity: 0.5,
  },
});
