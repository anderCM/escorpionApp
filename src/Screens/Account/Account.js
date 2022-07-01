import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getMeApi } from "../../Api/User";
import UserInfo from "../../Components/Account/UserInfo";
import Menu from "../../Components/Account/Menu";
import useAuth from "../../Hooks/useAuth";
import StatusBar from "../../Components/StatusBar";
import Search from "../../Components/Search";
import colors from "../../Styles/Colors";
import Loading from "../../Components/Loading";

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  console.log(auth);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      {!user ? (
        <Loading text="Cargando Perfil" size="large" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
