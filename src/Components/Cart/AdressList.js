import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { map, size } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

import Loading from "../Loading";
import colors from "../../Styles/Colors";

export default function AdressList({
  addresses,
  selectedAddress,
  setSelectedAddress,
  from,
}) {
  const navigation = useNavigation();
  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, [addresses]);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Selecciona Dirección de Envío</Text>
      {!addresses ? (
        <Loading text="Cargando Direcciones" size="large" />
      ) : size(addresses) == 0 ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("accountApp", {
              screen: "add-address",
              params: { from: from },
            })
          }
        >
          <View style={styles.addAddress}>
            <Text style={styles.addressText}>Añadir una dirección</Text>
            <IconButton icon="arrow-right" color="#000" size={19} />
          </View>
        </TouchableOpacity>
      ) : (
        map(addresses, (address, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => setSelectedAddress(address)}
          >
            <View
              style={[
                styles.address,
                address.id == selectedAddress?.id && styles.checked,
              ]}
            >
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
                />
                Recibe: {address.attributes.name_lastname}
              </Text>
              <Text>
                <MaterialCommunityIcons
                  name="sign-direction"
                  size={17}
                  color={colors.primary}
                />
                {address.attributes.address}
              </Text>
              <View style={styles.blockLine}>
                <MaterialCommunityIcons
                  name="city"
                  size={17}
                  color={colors.primary}
                />
                <Text>{address.attributes.district}, </Text>
                <Text>{address.attributes.city}</Text>
              </View>
              <Text>
                <MaterialCommunityIcons
                  name="cellphone"
                  size={17}
                  color={colors.primary}
                />
                {address.attributes.phone}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
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
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: "#F8F9D790",
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
});
