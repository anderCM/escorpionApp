import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import SearchHistory from "./SearchHistory";
import { updateSearchHistoryApi } from "../../Api/Search";

export default function Search({ currentSearch }) {
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");
  const [showHistory, setShowHistory] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();

  const onChangeSearch = (query) => setSearchQuery(query);

  const openSearch = () => {
    animatedTransition.start();
    setShowHistory(!showHistory);
  };

  const closeSearch = () => {
    animatedTransitionReset.start();
    Keyboard.dismiss();
    setShowHistory(!showHistory);
  };

  const onSearch = async (reuseSearch) => {
    const isReuse = typeof reuseSearch === "string";

    closeSearch();
    !isReuse && (await updateSearchHistoryApi(searchQuery));
    if (route.name === "search") {
      navigation.push("search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    } else {
      navigation.navigate("search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="eye-slash"
          size={20}
          style={[styles.backArrow, arrowAnimation]}
          onPress={closeSearch}
        />
        <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
          <Searchbar
            placeholder="Buscar Producto"
            onFocus={openSearch}
            value={searchQuery}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSearch}
          />
        </Animated.View>
      </View>
      <SearchHistory
        showHistory={showHistory}
        containerHeight={containerHeight}
        onSearch={onSearch}
      />
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
    color: "#000",
  },
});
