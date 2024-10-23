import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {AppContext} from '../../helper/context/AppContext';
import { RootStackParamList } from "../../utils/types";
import {isPast, differenceInDays} from "date-fns";

const useHomeLogic = () => {
  const {opportunities, codeTips, isLoggedIn, user, products, xp} = useContext(AppContext);
  const randomIndex = Math.floor(Math.random() * products.length);
  const recentOffers = opportunities.map((opp) => {
    if (opp.Expires) {
      if (!isPast(opp.Expires)) return opp;
    } else {
      const publishedAt = new Date(opp.publishedAt);
      const days = differenceInDays(new Date, publishedAt);
      if (days <= 5) return opp;
    }
  });
  const opportunityIndex = Math.floor(Math.random() * ((recentOffers.length - 1) - 0 + 1)) + 0;
  const [showCompleteProfile, setShowCompleteProfile] = useState(true);
  const [showProfileCard, setShowProfileCard] = useState<boolean>(false);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const profilePhoto = user.photo ?
    `https://insightify-admin.ablestate.cloud${user.photo.url}` :
    undefined;
  
  const handleCompleteProfile = () => {
    setShowProfileCard(!showProfileCard);
    setShowCompleteProfile(!showCompleteProfile);
  }
  
  const toggleCompleteProfileCard = () => {setShowCompleteProfile(false)}
  
  return {
    navigation,
    profilePhoto,
    recentOffers,
    codeTips,
    isLoggedIn,
    user,
    products,
    xp,
    randomIndex,
    opportunityIndex,
    showCompleteProfile,
    showProfileCard,
    setShowCompleteProfile,
    setShowProfileCard,
    handleCompleteProfile,
    toggleCompleteProfileCard,
  }
}

export default useHomeLogic;