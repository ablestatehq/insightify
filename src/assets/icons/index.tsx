import React from 'react';
import { COLOR } from '../../constants/constants';
import {
  MaterialIcons, MaterialCommunityIcons,
  Fontisto, AntDesign, Ionicons, FontAwesome,
  EvilIcons, Feather,
  Octicons
} from '@expo/vector-icons';

interface IconName {
  name: string // 'Deck' | 'Sky' | 'Talent' | 'More',
  isActive?: boolean//true | false,
  size?: number
  press?: () => void
  _color?: string
}

const SIZE = {
  HIGHEST: 25,
  MEDIUM: 20,
  SMALL: 15
}
const Icon: React.FC<IconName> = ({ name, isActive, size, press, _color }) => {
  switch (name) {
    case 'Home':
      return <Feather
        name="home"
        size={size ? size : 20}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />
    case 'Offers':
      return <Fontisto
        name="spinner-refresh"
        size={size ? size : 20}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />
    case 'Career':
      return <MaterialCommunityIcons
        name="stairs-up"
        size={size ? size : 20}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />
    case 'More':
      return <MaterialIcons
        name="more-horiz"
        size={SIZE.MEDIUM}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />
    case 'Share':
      return <AntDesign
        size={20}
        name="sharealt"
        color={"black"}
        onPress={press}
      />
    case 'report':
      return <Ionicons
        name={isActive ? "flag" : "flag-outline"}
        size={size ? size : 20}
        color={COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'close':
      return <AntDesign
        name='closecircle'
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'clipboard':
      return <FontAwesome
        name="clipboard"
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'search':
      return <EvilIcons
        name="search"
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'message':
      return <AntDesign
        name='message1'
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'heart-outline':
      return <Ionicons
        name="heart-outline"
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'heart':
      return <Ionicons
        name="heart"
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'verified':
      return <Octicons
        name="verified"
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />
    case 'unverified':
      return <Octicons
        name="unverified"
        size={size ? size : 20}
        color={_color ? _color : COLOR.PRIMARY_300}
        onPress={press}
      />

  }
};

export default React.memo(Icon)