import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";

import StatusBarCustom from "../../Components/StatusBar";
import Search from "../../Components/Search/Search";
import NewProducts from "../../Components/Home/NewProducts";
import colors from "../../Styles/Colors";
import Banner from "../../Components/Home/Banner";

export default function Home() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
      <Search />
      <NewProducts />
    </>
  );
}
