import React from "react";
import { ScrollView } from "react-native";

import StatusBarCustom from "../../Components/StatusBar";
import Search from "../../Components/Search/Search";
import NewProducts from "../../Components/Home/NewProducts";
import colors from "../../Styles/Colors";

export default function Home() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
      <Search />
      <ScrollView>
        <NewProducts />
      </ScrollView>
    </>
  );
}
