import React from "react";
import {clearLocalData, retrieveLocalData, storeToLocalStorage} from "../../utils/localStorageFunctions";
import {IDialogBox, RootStackParamList} from "../../utils/types";
import {AppContext} from "../context/AppContext";
import {isProfileComplete} from "../functions/functions";
import {useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getDataId, updateStrapiData } from "../../../api/strapiJSAPI";

const LOGOUT_MESSAGE = "Are you sure you want to log out?";

const useProfile = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    user,
    setXp,
    isNotificationEnabled,
    setIsNotificationEnabled,
  } = React.useContext(AppContext);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showProfileCard, setShowProfileCard] = React.useState<boolean>(false);
  const [joinVisible, setJoinVisible] = React.useState<boolean>(false);
  const [dialog, setDialog] = React.useState<IDialogBox>({
    visible: false,
    title: '',
    message: '',
    acceptText: 'Logout',
    cancelText: 'Cancel',
    onReject() { setDialog({ ...dialog, visible: false }) },
    onAccept() {
      handleLoginLogout();
    }
  });
  const profilePhoto = user.photo ?
    `https://insightify-admin.ablestate.cloud${user.photo.url}` :
    undefined;

  const userProfile = React.useMemo(() => {
    if (isLoggedIn) {
      return {
        completed: isProfileComplete(user) ? `${user.firstName} ${user.lastName}` : 'Complete Profile',
        inCommunity: user?.isMember,
        operations: () => {
          if (!isProfileComplete(user)) {
            setShowProfileCard(true);
          }
        },
      };
    } else {
      return {
        completed: 'Sign in',
        inCommunity: false,
        operations: () => navigation.navigate('Login', { title: 'Settings' }),
      };
    }
  }, [isLoggedIn, user]);

  const handleLoginLogout = async () => {
    await clearLocalData('user_token');
    await clearLocalData('isMember');
    setDialog({ ...dialog, visible: false })
    setXp(0);
    setUser({});
    setIsLoggedIn(false);
  };

  const handleJoinCommunity = () => {
    setUser((prev: any) => ({...prev, isMember: true}));
    storeToLocalStorage('isMember', {isMember: true});
  };

  const toggleSwitch = async () => {
    setIsNotificationEnabled(!isNotificationEnabled);
    const tokens = await retrieveLocalData('tokens');
    if (tokens) {
      const { pushToken, isPushNotificationEnabled } = tokens;
      const id = await getDataId('notification-tokens', 'tokenID', pushToken);
      if (id) {
        await storeToLocalStorage('tokens', { pushToken, "isPushNotificationEnabled": !isPushNotificationEnabled });
        await updateStrapiData('notification-tokens', id[0]?.id, { subscription: !isPushNotificationEnabled });
      }
    }
  };

  return {
    dialog,
    setDialog,
    navigation,
    profilePhoto,
    userProfile,
    handleLoginLogout,
    handleJoinCommunity,
    joinVisible,
    setJoinVisible,
    showProfileCard,
    isLoggedIn,
    setIsLoggedIn,
    toggleSwitch,
    setUser,
    user,
    setXp,
    isNotificationEnabled,
    setIsNotificationEnabled,
    LOGOUT_MESSAGE,
    setShowProfileCard
  }
};

export default useProfile;