import { useFonts } from "expo-font";

const fontNames = {
  "ComfortaaLight": require('../fonts/Comfortaa/static/Comfortaa-Light.ttf'),
  "Comfortaa_Regular": require('../fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
  "ComfortaaMedium": require('../fonts/Comfortaa/static/Comfortaa-Medium.ttf'),
  "ComfortaaSemiBold": require('../fonts/Comfortaa/static/Comfortaa-SemiBold.ttf'),
  "ComfortaaBold": require('../fonts/Comfortaa/static/Comfortaa-Bold.ttf'),
  "RalewayThin": require('../fonts/Raleway/static/Raleway-Thin.ttf'),
  "RalewayExtraLight": require('../fonts/Raleway/static/Raleway-ExtraLight.ttf'),
  "RalewayLight": require('../fonts/Raleway/static/Raleway-Light.ttf'),
  "RalewayRegular": require('../fonts/Raleway/static/Raleway-Regular.ttf'),
  "RalewayMedium": require('../fonts/Raleway/static/Raleway-Medium.ttf'),
  "RalewaySemiBold": require('../fonts/Raleway/static/Raleway-SemiBold.ttf'),
  "RalewayBold": require('../fonts/Raleway/static/Raleway-Bold.ttf'),
  "RalewayExtraBold": require('../fonts/Raleway/static/Raleway-ExtraBold.ttf'),
  "RalewayBlack": require('../fonts/Raleway/static/Raleway-Black.ttf')
};

// async function* promiseGenerator<T>(promise: Promise<T>): AsyncGenerator<T>{
//   yield await promise;
// }

export async function loadFonts() {
  let [fontsLoaded, fontError] = useFonts(fontNames);
  return [
    fontsLoaded,
    fontError
  ]
};