import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

export default function StatusBarCustom({ backgroundColor, ...rest }) {
  return (
    <>
      <StatusBar backgroundColor={backgroundColor} {...rest} />
      <SafeAreaView style={{ flex: 0, backgroundColor: backgroundColor }} />
    </>
  );
}
