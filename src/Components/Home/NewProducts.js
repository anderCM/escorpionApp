import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getLastProductsApi, getProductsByPage } from "../../Api/Product";
import Loading from "../Loading";
import Banner from "./Banner";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  /* const [startLimit, setStartLimit] = useState({ start: 0, limit: 10 }); */
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    setisLoading(true);
    getProducts();
  }, [currentPage]);

  const gotoProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };

  const getProducts = async () => {
    const response = await getProductsByPage(currentPage);

    response.data.length > 0 ? response.data.map((product) => products.push(product)) : products;
    setProducts(products)
    setisLoading(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        key={item.id}
        onPress={() => gotoProduct(item.id)}
      >
        <View style={styles.containerProduct}>
          <View style={styles.product}>
            <Image
              style={styles.image}
              source={{
                uri: `${item.attributes.images.data[0].attributes.formats.small.url}`,
              }}
            />
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {item.attributes.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <Loading text="Cargando productos" size="small" />
    ) : null;
  };

  const handleLoadMore = () => {
    /* setStartLimit({
      start: startLimit.start + 10,
      limit: startLimit.limit + 10,
    }); */
    setCurrentPage(currentPage + 1);
    setisLoading(true);
  };

  return (
    <FlatList
      ListHeaderComponent={<Banner />}
      style={styles.container}
      numColumns={2}
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  containerProduct: {
    width: "50%",
    padding: 3,
  },
  product: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  image: {
    height: 150,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  name: {
    marginTop: 15,
    fontSize: 15,
  },
});
