import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { map } from "lodash";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import useAuth from "../../Hooks/useAuth";
import { deleteAddressApi } from "../../Api/Address";
import colors from "../../Styles/Colors";

export default function AddressList({ addresses }) {
  const { auth } = useAuth();
  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminando Dirección",
      `¿Estás seguro que quieres eliminar la dirección: ${address.title}?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => deleteAddress(address._id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async (idAddress) => {
    try {
      const response = await deleteAddressApi(auth, idAddress);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Text>{address.name_lastname}</Text>
          <View style={styles.blockAddress}>
            <Text>{address.address}, </Text>
            <Text>{address.city}, </Text>
            <Text>{address.district}</Text>
          </View>
          <Text>Ref: {address.reference}</Text>
          <Text>Tel: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              color={colors.primary}
              style={styles.button}
            >
              <AwesomeIcon name="edit" size={19} color={colors.dark} />
            </Button>
            <Button
              mode="contained"
              color={colors.deleteColor}
              style={styles.button}
              onPress={() => deleteAddressAlert(address)}
            >
              <AwesomeIcon name="trash-o" size={19} color={colors.dark} />
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
