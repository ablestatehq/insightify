import { COLOR, DIMEN } from '@src/constants/constants';
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

interface ImageGridProps{
  images: any[]
}
const Index = ({images}: ImageGridProps) => {
  const containerSize = 200;
  const minSize = 20;
  const maxDisplayCount = 10;

  const displayCount = Math.min(images.length, maxDisplayCount);
  const imagesToShow = images.slice(0, displayCount);

  const imageSize = Math.max(
    containerSize / Math.ceil(Math.sqrt(displayCount)),
    minSize
  );

  return (
    <View style={styles.container}>
      {imagesToShow.map((img, index) => (
        <Image
          key={index}
          source={{ uri: img }}
          style={[
            styles.image,
            { width: imageSize, height: imageSize },
          ]}
        />
      ))}
      {images.length > maxDisplayCount && (
        <View style={[styles.moreIndicator, { width: imageSize, height: imageSize }]}>
          <Text style={styles.moreText}>+{images.length - maxDisplayCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    margin: DIMEN.CONSTANT.XXSM,
    borderRadius: DIMEN.CONSTANT.XSM,
  },
  moreIndicator: {
    backgroundColor: COLOR.GREY_300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DIMEN.CONSTANT.XSM,
  },
  moreText: {
    color: COLOR.WHITE,
  },
});

export default Index;
