import React, { useState, useCallback } from "react";
import { Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { getMeApi } from "../../Api/User";
import UserInfo from "../../Components/Account/UserInfo";
import Menu from "../../Components/Account/Menu";
import useAuth from "../../Hooks/useAuth";
import StatusBar from "../../Components/StatusBar";
import Search from "../../Components/Search";
import colors from "../../Styles/Colors";
import Loading from "../../Components/Loading";
import Auth from "../Auth";

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (auth) {
          const response = await getMeApi(auth.token);
          setUser(response);
          return;
        }
        Toast.show("Es necesario iniciar sesión para ver tu información personal", {
          position: Toast.positions.CENTER,
        })
      })();
    }, [auth])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />

          <Search />
          {!auth ? <Auth /> :
            (
              !user ? (
                <Loading text="Cargando Perfil" size="large" />
              ) :
                <ScrollView>
                  <UserInfo user={user} />
                  <Menu />
                </ScrollView>)
          }

    </>
  );
}
