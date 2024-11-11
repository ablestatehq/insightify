import React from 'react';
import { COLOR } from '@constants/constants';
import { AntDesign, Ionicons, FontAwesome,
  EvilIcons, Feather, Octicons} from '@expo/vector-icons';

interface IconName {
  name: string // 'Deck' | 'Sky' | 'Talent' | 'More',
  isActive?: boolean//true | false,
  size?: number
  press?: () => void
  _color?: string
}

const Icon: React.FC<IconName> = ({ name, isActive, size, press, _color }) => {
  switch (name) {
    case 'home':
      return <Feather
        name="home"
        size={size ? size : 20}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />
    case 'offers':
      return <Ionicons
        name="briefcase-outline"
        size={size ? size : 20}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />
    case 'career':
      return <Ionicons
        name="school-outline"
        size={size ? size : 20}
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
    case 'settings':
      return <Ionicons
        name="settings-outline"
        size={size ? size : 20}
        color={isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_100}
        onPress={press}
      />

  }
};

export default React.memo(Icon)