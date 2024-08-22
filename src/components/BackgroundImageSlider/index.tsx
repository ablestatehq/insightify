import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import { environments } from '../../constants/environments';

interface BackgroundImageSliderProps {
  images: any[];
  children: React.ReactNode
}
const Index = ({images, children}: BackgroundImageSliderProps) => {

  console.log(images)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const getImage = (url:string) => ({uri: `${environments.BASE_URL}${url}`})
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMethod='resize'
        resizeMode='contain'
        source={getImage(images[currentIndex]?.attributes?.url)}
        style={styles.backgroundImage}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
  },
});

export default Index;
