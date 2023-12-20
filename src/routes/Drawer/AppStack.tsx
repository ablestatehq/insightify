import { COLOR } from "../../constants/contants";
import CustomDrawerContent from "./CustomDrawerContent";
import Contact from "../../screens/Drawer/Contact/Contact";
import FeedBack from "../../screens/Drawer/FeedBack/FeedBack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Privacy from "../../screens/Drawer/Privacy/Privacy";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLOR.ORANGE_300,
        drawerStyle: {
          backgroundColor:'transparent'
        },
        drawerItemStyle: {
          
        }
      }}
    >
      {/* <Drawer.Screen
        name='HomeTabs'
        component={Routes}
        options={{
          title: 'Home',
        }}
      /> */}
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