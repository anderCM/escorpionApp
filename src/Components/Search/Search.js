import React, { useState, useEffect } from "react";
import { View, StyleSheet, Keyboard, Animated } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../../Styles/Colors";
import {
  AnimatedIcon,
  animatedTransition,
  animatedTransitionReset,
  arrowAnimation,
  inputAnimation,
  inputAnimationWidth,
} from "./SearchAnimation";

export default function Search() {
  const openSearch = () => {
    animatedTransition.start();
  };

  const closeSearch = () => {
    animatedTransitionReset.start();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, arrowAnimation]}
          onPress={closeSearch}
        />
        <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
          <Searchbar placeholder="Buscar Producto" onFocus={openSearch} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  containerInput: {
    position: "relative",
    alignItems: "flex-end",
  },
  backArrow: {
    position: "absolute",
    left: 0,
    top: 15,
    colors: colors.fontLight,
  },
});
