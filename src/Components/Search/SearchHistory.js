import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { map } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getSearchHistoryApi } from "../../Api/Search";
import colors from "../../Styles/Colors";

export default function SearchHistory({
  showHistory,
  containerHeight,
  onSearch,
}) {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (showHistory) {
      (async () => {
        const response = await getSearchHistoryApi();
        setHistory(response);
      })();
    }
  }, [showHistory]);

  return (
    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        { top: containerHeight },
      ]}
    >
      {history &&
        map(history, (item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onSearch(item.search)}
          >
            <View style={styles.historyItem}>
              <Text style={styles.text}>{item.search}</Text>
              <MaterialCommunityIcons
                name="arrow-collapse-right"
                size={20}
                color="#000"
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  history: {
    position: "absolute",
    backgroundColor: colors.bgLight,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#53005f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
