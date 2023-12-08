import { useFonts } from "expo-font";

export function fontsLoading() {
    let [fontsLoaded, fontError] = useFonts({
    "ComfortaaLight": require('./Comfortaa/static/Comfortaa-Light.ttf'),
    "Comfortaa_Regular": require('./Comfortaa/static/Comfortaa-Regular.ttf'),
    "ComfortaaMedium": require('./Comfortaa/static/Comfortaa-Medium.ttf'),
    "ComfortaaSemiBold": require('./Comfortaa/static/Comfortaa-SemiBold.ttf'),
    "ComfortaaBold": require('./Comfortaa/static/Comfortaa-Bold.ttf'),
    "RalewayThin": require('./Raleway/static/Raleway-Thin.ttf'),
    "RalewayExtraLight": require('./Raleway/static/Raleway-ExtraLight.ttf'),
    "RalewayLight": require('./Raleway/static/Raleway-Light.ttf'),
    "RalewayRegular": require('./Raleway/static/Raleway-Regular.ttf'),
    "RalewayMedium": require('./Raleway/static/Raleway-Medium.ttf'),
    "RalewaySemiBold": require('./Raleway/static/Raleway-SemiBold.ttf'),
    "RalewayBold": require('./Raleway/static/Raleway-Bold.ttf'),
    "RalewayExtraBold": require('./Raleway/static/Raleway-ExtraBold.ttf'),
    "RalewayBlack": require('./Raleway/static/Raleway-Black.ttf')
  }
    );
  return {
    fontsLoaded,
    fontError
  }
}