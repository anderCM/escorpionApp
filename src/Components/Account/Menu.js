import React from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import useAuth from "../../Hooks/useAuth";
import { deleteUserApi } from "../../Api/User";

export default function Menu() {
  const navigation = useNavigation();
  const { auth, logout } = useAuth();
  const LogoutAccount = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres salir de tu cuenta?",
      [
        {
          text: "No",
        },
        {
          text: "Si",
          onPress: logout,
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const DeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Si eliminas tu cuenta, perderás todo tu historial de compras, datos y más",
      [
        {
          text: "Cancelar"
        },
        {
          text: "Eliminar",
          onPress: async () => {

            try {
              const result = await deleteUserApi(auth);
              if (result.confirmed == true) {
                Toast.show("Cuenta eliminada", {
                  position: Toast.positions.CENTER,
                });
                logout();
                return;
              }
              Toast.show("No se pudo eliminar tu cuenta", {
                position: Toast.positions.CENTER,
              });
            } catch (error) {
              console.error(error)
            }
          }
        }
      ],
      {
        cancelable: false,
      }
    )
  }

  return (
    <>
      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>
        <List.Item
          title="Cambiar nombre"
          description="Cambia el nombre de tu cuenta"
          left={(props) => <List.Icon {...props} icon="face-man" />}
          onPress={() => navigation.navigate("change-name")}
        />
        <List.Item
          title="Cambiar correo"
          description="Cambia el correo de tu cuenta"
          left={(props) => <List.Icon {...props} icon="at" />}
          onPress={() => navigation.navigate("change-email")}
        />
        <List.Item
          title="Cambiar alias"
          description="Cambia el alias de tu cuenta"
          left={(props) => <List.Icon {...props} icon="sim" />}
          onPress={() => navigation.navigate("change-username")}
        />
        <List.Item
          title="Cambiar contraseña"
          description="Cambia la contraseña de tu cuenta"
          left={(props) => <List.Icon {...props} icon="key" />}
          onPress={() => navigation.navigate("change-password")}
        />
        <List.Item
          title="Eliminar mi cuenta"
          description="Eliminar cuenta permanentemente"
          left={(props) => <List.Icon {...props} icon="delete" />}
          onPress={DeleteAccount}
        />
        {/* <List.Item
          title="Mis direcciones"
          description="Administra tus direcciones de envío"
          left={(props) => <List.Icon {...props} icon="google-maps" />}
          onPress={() => navigation.navigate("addresses")}
        /> */}
      </List.Section>
      <List.Section>
        <List.Subheader>Apps</List.Subheader>
        <List.Item
          title="Mis Pedidos"
          description="Todos los pedidos"
          left={(props) => <List.Icon {...props} icon="clipboard-list" />}
          onPress={() => navigation.navigate("my-orders")}
        />
        <List.Item
          title="Lista de Favoritos"
          description="Todos tus productos Favoritos"
          left={(props) => <List.Icon {...props} icon="heart" />}
          onPress={() => navigation.navigate("favorites")}
        />
        <List.Item
          title="Jr. Andahuaylas 256 - La Victoria"
          description="Telf: 934 913 736"
          left={(props) => <List.Icon {...props} icon="google-maps" />}
        />
        <List.Item
          title="Cerrar Sesión"
          description="Cierra esta Sesión"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={LogoutAccount}
        />

      </List.Section>
    </>
  );
}
