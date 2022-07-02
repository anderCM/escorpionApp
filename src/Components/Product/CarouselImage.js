import React, { useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";

import { SERVER_RESOURCERS } from "../../Utils/Constans";

const width = Dimensions.get("window").width;
const height = 400;

export default function CarouselImage({ images }) {
  console.log("-------------------------------------------------------------------------------------------------")
  console.log(images);
  const [imageActive, setimageActive] = useState(0);
  const renderItem = ({ item }) => {
    return (
      <Image
        style={styles.carousel}
        source={{
          uri: `${SERVER_RESOURCERS}${item.attributes.formats.small.url}`,
        }}
      />
    );
  };

  return (
    <>
      <Carousel
        layout="stack"
        layoutCardOffset={`0`}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setimageActive(index)}
      />
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.9}
      />
    </>
  );
}

const styles = StyleSheet.create({
  carousel: {
    width,
    height,
    resizeMode: "contain",
  },

});
