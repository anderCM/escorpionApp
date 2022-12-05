import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useAuth from "../../Hooks/useAuth";
import { deleteAddressApi } from "../../Api/Address";
import colors from "../../Styles/Colors";
import { size } from "../../Styles/sizes";

export default function AddressList({ addresses, setReloadAddresses }) {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminando Dirección",
      `¿Estás seguro que quieres eliminar la dirección: ${address.attributes.title}?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => deleteAddress(address.id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAddresses(true);
    } catch (error) {
      console.log(error);
    }
  };

  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress });
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address.id} style={styles.address}>
          <Text style={styles.title}>
            <MaterialCommunityIcons
              name="google-maps"
              size={17}
              color={colors.primary}
            />{" "}
            {address.attributes.title}
          </Text>
          <Text>
            <MaterialCommunityIcons
              name="account-child"
              size={17}
              color={colors.primary}
            />{" "}
            {address.attributes.name_lastname}
          </Text>
          <View style={styles.blockAddress}>
            <Text>
              <MaterialCommunityIcons
                name="sign-direction"
                size={17}
                color={colors.primary}
              />{" "}
              {address.attributes.address},{" "}
            </Text>
            <Text>{address.attributes.city}, </Text>
            <Text>{address.attributes.district}</Text>
          </View>
          <Text>
            <MaterialCommunityIcons
              name="directions"
              size={17}
              color={colors.primary}
            />{" "}
            Ref: {address.attributes.reference}
          </Text>
          <Text>
            <MaterialCommunityIcons
              name="cellphone"
              size={17}
              color={colors.primary}
            />{" "}
            Tel: {address.attributes.phone}
          </Text>
          <View style={styles.actions}>
            <IconButton
              icon="home-edit"
              color="#000"
              size={size.helpingIcons}
              style={{ backgroundColor: colors.primary }}
              onPress={() => goToUpdateAddress(address.id)}
            />

            <IconButton
              icon="delete"
              color="#000"
              size={size.helpingIcons}
              style={{ backgroundColor: colors.bgLove }}
              onPress={() => deleteAddressAlert(address)}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    /* fontSize:14, */
    paddingBottom: 5,
  },
  blockAddress: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
  },
});
