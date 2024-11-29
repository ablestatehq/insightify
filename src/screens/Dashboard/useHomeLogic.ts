import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {AppContext} from '@src/context/AppContext';
import { RootStackParamList } from "@src/types";
import {isPast, differenceInDays} from "date-fns";
import { useProducts } from "@src/hooks";

const useHomeLogic = () => {
  const { opportunities, codeTips, isLoggedIn, user, xp, setCodeTips } = useContext(AppContext);
  const { products } = useProducts();

  const randomIndex = useMemo(() => {
    return products.length > 0 ? Math.floor(Math.random() * products.length) : -1;
  }, []);
  
  const recentOffers = useMemo(() => {
    return opportunities
      .map((opp) => {
        if (opp.Expires && !isPast(opp.Expires)) {
          return opp;
        } else {
          const publishedAt = new Date(opp.publishedAt);
          const days = differenceInDays(new Date(), publishedAt);
          if (days <= 5) return opp;
        }
      })
      .filter(Boolean);
  }, []);

  const opportunityIndex = useMemo(() => {
    return recentOffers.length > 0
      ? Math.floor(Math.random() * recentOffers.length)
      : -1;
  }, []);

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
  
  const toggleCompleteProfileCard = () => { setShowCompleteProfile(false) }
  
  return {
    navigation,
    profilePhoto,
    recentOffers,
    codeTips,
    isLoggedIn,
    user,
    products,
    xp,
    setCodeTips,
    randomIndex,
    opportunities,
    opportunityIndex,
    showCompleteProfile,
    showProfileCard,
    setShowCompleteProfile,
    setShowProfileCard,
    handleCompleteProfile,
    toggleCompleteProfileCard,
  }
};

export default useHomeLogic;