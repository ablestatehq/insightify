//src/screens/slide.js

import React from "react"
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLOR, DIMEN, FONTSIZE } from "../../../constants/contants";

const { SCREENHEIGHT: PAGE_HEIGHT, SCREENWIDTH: PAGE_WIDTH } = DIMEN;

const SIZE = PAGE_WIDTH * 0.7;
const dgl = Math.sqrt(Math.pow(PAGE_HEIGHT, 2) + Math.pow(PAGE_WIDTH, 2));

interface PageProps {
  index: number,
  title: any,
  translateX?: any,
}

export const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const inputRange = [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH]

  // const rstyle = useAnimatedStyle(() => {
  //   const scale = interpolate(
  //     (translateX as any).value,
  //     inputRange,
  //     [0, 1, 0],
  //     Extrapolate.CLAMP
  //   )

  //   const borderRadius = interpolate(
  //     (translateX as any).value,
  //     inputRange,
  //     [0, SIZE / 2, 0],
  //     Extrapolate.CLAMP
  //   )

  //   return {
  //     transform: [{ scale: scale }],
  //     // transform: [{ rotate: scale }],
  //     borderRadius,
  //   }
  // })

  // const textStyle = useAnimatedStyle(() => {
  //   const scale = interpolate(
  //     translateX.value,
  //     inputRange,
  //     [PAGE_HEIGHT / 2, 0, PAGE_HEIGHT / 2],
  //     Extrapolate.CLAMP
  //   )

  //   const opacity = interpolate(
  //     translateX.value,
  //     inputRange,
  //     [-4, 1, -4],
  //     Extrapolate.CLAMP
  //   )

  //   return {
  //     opacity,
  //     transform: [{ translateY: scale }],
  //   }
  // })

  return (
    <>
      <View style={Style.pageContainer}>
        <View style={Style.container2}>
          {index == 0 &&
            <Image
              style={{
                height: 90,
                borderRadius: 5,
                width: dgl * 0.26,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('../../../../assets/icon.png')}
            />}
        </View>

        <Animated.View
          style={[
            Style.container
          ]}
        >
          <Text style={Style.text}>{title?.head}</Text>
          <Text style={Style.text2}>{title?.des}</Text>
        </Animated.View>
      </View>

    </>
  )
}



const Style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    top: 200,
    position: 'absolute'
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: COLOR.B_300,
    position: "absolute",
    justifyContent: 'center',
    alignSelf: 'center',
    top: SIZE / 3,
  },
  text: {
    color: COLOR.B_300,
    textAlign: "center",
    width: PAGE_WIDTH - 120,
    textTransform: 'uppercase',
    fontSize: FONTSIZE.TITLE_1,
    fontWeight:'bold'
  },
  text2: {
    color: COLOR.B_300,
    textAlign: "center",
    width: PAGE_WIDTH - 120,
    fontSize: FONTSIZE.TITLE_2,
  },
});