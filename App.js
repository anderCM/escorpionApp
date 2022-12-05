import "react-native-gesture-handler";
import React, { useState, useMemo, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";

import AppNavigation from "./src/Navigation/AppNavigation";
import Auth from "./src/Screens/Auth";
import AuthContext from "./src/Context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/Api/Token";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user.id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>{auth ? <AppNavigation /> : <Auth />}</PaperProvider>
    </AuthContext.Provider>
  );
}
