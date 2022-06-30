import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";

import { getAddressesApi } from "../../Api/Address";
import AddressList from "../../Components/Address/AddressList";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading";
import colors from "../../Styles/Colors";

export default function Addresses() {
  const [addresses, setAddresses] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);
  const navigation = useNavigation();
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response.data);
        setReloadAddresses(false);
      })();
    }, [reloadAddresses])
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Direcciones</Text>
      <TouchableOpacity onPress={() => navigation.navigate("add-address")}>
        <View style={styles.addAddress}>
          <Text style={styles.addressText}>Añadir una dirección</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </TouchableOpacity>
      {!addresses ? (
        <Loading
          text="Cargando direcciones"
          color={colors.primary}
          size="large"
        />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}>Crea tu Primera dirección</Text>
      ) : (
        <AddressList
          addresses={addresses}
          setReloadAddresses={setReloadAddresses}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
