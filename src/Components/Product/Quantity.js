import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Quantity({ quantity, setQuantity }) {
  return (
    <DropDownPicker
      items={[
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
        {
          label: "3",
          value: 3,
        },
      ]}
     /*  defaultValue={quantity}
      itemStyle={styles.itemStyle} */
      setItems={setQuantity}
      /* multiple={true}
      min={1}
      max={5} */
      containerStyle={styles.container}
      dropdo
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 100,
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
});
