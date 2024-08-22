import { StyleSheet, View } from "react-native";
import { COLOR, DIMEN } from "../../constants/constants";
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";

interface DotProps {
  data: any[],
  style?: any,
  color: string,
  translateX: any,
  setCurrentIndex: (n: number) => void
}

const { SCREENHEIGHT: PAGE_HEIGHT, SCREENWIDTH: PAGE_WIDTH } = DIMEN;

export const Dot: React.FC<DotProps> = ({ style, translateX, data, color, setCurrentIndex }) => {

  return (
    <View style={style ? style : {
      flex: 1,
      bottom: 25,
      marginLeft: 25,
      flexDirection: 'row',
      position: 'absolute',
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
    }}>
      {data.map((_: any, index: number) => {
        const inputRange = [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH]
        setCurrentIndex(Math.floor(translateX.value / PAGE_WIDTH));
        const textStyle = useAnimatedStyle(() => {
          const size = interpolate(
            translateX.value,
            inputRange,
            [10, 25, 10],
            Extrapolate.CLAMP)
          const opacity = interpolate(
            translateX.value,
            inputRange,
            [0.5, 2, 0.5],
            Extrapolate.CLAMP)
          return {
            width: size,
            opacity,
            backgroundColor: color
          }
        })
        return (<Animated.View style={[Style.dot, textStyle]} key={index.toString()} />)
      })}
    </View>
  )
}

const Style = StyleSheet.create({
  dot: {
    height: 8,
    margin: 5,
    borderRadius: 10,
    borderColor: COLOR.PRIMARY_300
  }
})