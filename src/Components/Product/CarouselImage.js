import React, { useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
/* import Carousel, { Pagination } from "react-native-snap-carousel"; */
import Carousel from "react-native-reanimated-carousel";
import { size } from "lodash";

const width = Dimensions.get("window").width;
const height = 400;

export default function CarouselImage({ images }) {
  const [imageActive, setimageActive] = useState(0);
  const renderItem = ({ item }) => {
    return (
      <Image
        style={styles.carousel}
        source={{
          uri: `${item.attributes.formats.small.url}`,
        }}
      />
    );
  };

  return (
    <>
    <Carousel
        loop
        width={width}
        height={height}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={500}
        onSnapToItem={(i) => setimageActive(i)}
        renderItem={renderItem}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
{/*       <Carousel
        layout="stack"
        layoutCardOffset={0}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setimageActive(index)}
      />
      <Pagination
        containerStyle={styles.dots}
        dotsLength={size(images)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.9}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  carousel: {
    width,
    height,
    resizeMode: "contain",
  },
  dots: {
    marginTop: -20,
    paddingBottom: 3,
  },
});
