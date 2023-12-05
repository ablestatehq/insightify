import { COLOR } from "../../constants/contants";
import Routes from "../routes";
import CustomDrawerContent from "./CustomDrawerContent";
import Contact from "../../screens/Drawer/Contact/Contact";
import FeedBack from "../../screens/Drawer/FeedBack/FeedBack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Privacy from "../../screens/Drawer/Privacy/Privacy";
import { useFonts } from "expo-font";

const Drawer = createDrawerNavigator();

const AppStack = () => {

  let [fontsLoaded, fontError] = useFonts({
    "ComfortaaLight": require('../../assets/fonts/Comfortaa/static/Comfortaa-Light.ttf'),
    "Comfortaa_Regular": require('../../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
    "ComfortaaMedium": require('../../assets/fonts/Comfortaa/static/Comfortaa-Medium.ttf'),
    "ComfortaaSemiBold": require('../../assets/fonts/Comfortaa/static/Comfortaa-SemiBold.ttf'),
    "ComfortaaBold": require('../../assets/fonts/Comfortaa/static/Comfortaa-Bold.ttf'),
    "RalewayThin": require('../../assets/fonts/Raleway/static/Raleway-Thin.ttf'),
    "RalewayExtraLight": require('../../assets/fonts/Raleway/static/Raleway-ExtraLight.ttf'),
    "RalewayLight": require('../../assets/fonts/Raleway/static/Raleway-Light.ttf'),
    "RalewayRegular": require('../../assets/fonts/Raleway/static/Raleway-Regular.ttf'),
    "RalewayMedium": require('../../assets/fonts/Raleway/static/Raleway-Medium.ttf'),
    "RalewaySemiBold": require('../../assets/fonts/Raleway/static/Raleway-SemiBold.ttf'),
    "RalewayBold": require('../../assets/fonts/Raleway/static/Raleway-Bold.ttf'),
    "RalewayExtraBold": require('../../assets/fonts/Raleway/static/Raleway-ExtraBold.ttf'),
    "RalewayBlack": require('../../assets/fonts/Raleway/static/Raleway-Black.ttf')
  }
  );


  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLOR.ORANGE_300,
        drawerStyle: {
          backgroundColor:'transparent'
        }
      }}
    >
      <Drawer.Screen
        name='HomeTabs'
        component={Routes}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name='Contact'
        component={Contact}
        options={{
          title: 'Contact Us',
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          title: 'Privacy Policy'
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedBack}
        options={{
          title:'Share your Feedback'
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack