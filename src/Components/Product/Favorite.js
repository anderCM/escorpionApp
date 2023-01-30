import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { size } from "lodash";
import Toast from "react-native-root-toast";

import useAuth from "../../Hooks/useAuth";
import {
  addFavoriteApi,
  isFavoriteApi,
  deleteFavoriteApi,
} from "../../Api/Favorite";
import colors from "../../Styles/Colors";

export default function Favorite({ product }) {
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [disabledFav, setDisabledFav] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product.data.id);
      if (size(response.data) == 0) setIsFavorite(false);
      else setIsFavorite(true);
      setDisabledFav(false);
    })();
  }, [product]);

  const addFavorite = async () => {
    const favoriteData = {
      product: product.data.id,
      user: auth.idUser,
    };
    if (!loading) {
      setLoading(true);
      try {
        await addFavoriteApi(auth, favoriteData);
        setIsFavorite(true);
        Toast.show("Agregado a Favoritos", {
          position: Toast.positions.CENTER,
        });
      } catch (error) {
        console.log(error);
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
      setLoading(false);
    }
  };

  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await deleteFavoriteApi(auth, product.data.id);
        setIsFavorite(false);
        Toast.show("Eliminado de favoritos", {
          position: Toast.positions.CENTER,
        });
      } catch (error) {
        console.log(error);
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        contentStyle={styles.btnAddFavoriteContent}
        onPress={isFavorite ? deleteFavorite : addFavorite}
        loading={loading}
        disabled={disabledFav}
      >
        {isFavorite ? (
          <MaterialCommunityIcons
            name="heart-off-outline"
            size={20}
            color="#fff"
          />
        ) : (
          <MaterialCommunityIcons name="heart-plus" size={20} color="black" />
        )}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingVertical: 5,
  },
  btnAddFavoriteContent: {
    backgroundColor: colors.bgLove,
    paddingVertical: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
