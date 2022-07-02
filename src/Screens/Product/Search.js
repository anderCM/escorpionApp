import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { size } from "lodash";

import StatusBarCustom from "../../Components/StatusBar";
import Search from "../../Components/Search/Search";
import { searchProductsApi } from "../../Api/Search";
import colors from "../../Styles/Colors";
import Loading from "../../Components/Loading";
import ResultNotFound from "../../Components/Search/ResultNotFound";
import ProductList from "../../Components/Search/ProductList";

export default function SearchScreen({ route }) {
  const { search } = route.params;

  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductsApi(search);
      setProducts(response);
    })();
  }, [route.params]);

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
      <Search currentSearch={search} />
      {!products ? (
        <Loading text={`Buscando ${search}`} size="large" />
      ) : size(products.data) == 0 ? (
        <ResultNotFound search={search} />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
