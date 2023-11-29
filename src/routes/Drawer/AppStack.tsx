import Routes from "../routes";
import { COLOR } from "../../constants/contants";
import CustomDrawerContent from "./CustomDrawerContent";
import Contact from "../../screens/Drawer/Contact/Contact";
import Privacy from "../../screens/Drawer/Privacy/Privacy";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FeedBack from "../../screens/Drawer/FeedBack/FeedBack";

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
          title: 'Contact',
        }}
      />
      {/* <Drawer.Screen
        name='Solutions'
        component={Contact}
        options={{
          title: 'Solution',
        }}
      /> */}
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