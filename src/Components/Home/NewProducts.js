import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { getLastProductsApi } from "../../Api/Product";

export default function NewProducts() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(2);
      console.log(response);
    })();
  }, []);

  return (
    <View>
      <Text>Hola Home</Text>
    </View>
  );
}
