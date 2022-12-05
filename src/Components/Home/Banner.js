import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { getBannersApi } from "../../Api/HomeBanner";
/* import Carousel, { Pagination } from "react-native-snap-carousel"; */
import Carousel from "react-native-reanimated-carousel";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { SERVER_RESOURCERS } from "../../Utils/Constans";

const width = Dimensions.get("window").width;
const height = 160;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [banneActive, setBanneActive] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await getBannersApi();
      setBanners(response.data);
    })();
  }, []);

  /*   if (!banners) return null; */

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => goToProduct(item.attributes.product.data.id)}
      >
        <Image
          style={styles.carousel}
          source={{
            uri: `${SERVER_RESOURCERS}${item.attributes.banner.data[0].attributes.formats.small.url}`,
          }}
        />
      </TouchableWithoutFeedback>
    );
  };
  const goToProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        data={banners}
        scrollAnimationDuration={2000}
        onSnapToItem={(i) => setBanneActive(i)}
        renderItem={renderItem}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
      {/*       <Carousel
        layout="default"
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        loop={true}
        onSnapToItem={(i) => setBanneActive(i)}
        autoplay={true}
        autoplayInterval={5000}
        autoplayDelay={2000}
        slideStyle={1}
      /> 
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={banneActive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        dotColor={styles.dot.backgroundColor}
        inactiveDotColor={styles.dot.backgroundColor}
      />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  carousel: {
    width,
    height,
  },
  dotsContainer: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  dot: {
    backgroundColor: "#fff",
  },
});
