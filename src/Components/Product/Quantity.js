import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Buy from "./Buy";
import Favorite from "./Favorite";

export default function Quantity({ quantity, setQuantity, product }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  /*   const [quantity, setQuantity] = useState(1) */
  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);
  return (
    <View style={styles.mainContainer}>
      <Favorite product={product} quantity={quantity} />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        language="ES"
        listMode="SCROLLVIEW"
        dropDownDirection="TOP"
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        autoScroll={true}
        itemStyle={styles.itemStyle}
        placeholder="1"
        style={styles.dropDownPicker}
        containerStyle={styles.container}
        labelStyle={styles.labelStyle}
        onChangeValue={(value) => setQuantity(value)}
      />
      <Buy product={product} quantity={quantity} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    /*  alignContent:"center" */
  },
  container: {
    /* height: 40, */
    width: 100,
  },
  itemStyle: {
    justifyContent: "flex-start",
    borderColor:"red"
  },
  dropDownPicker: {
    backgroundColor: "#fafafa",
  },
  labelStyle: {
    color: "#000",
  },
});
