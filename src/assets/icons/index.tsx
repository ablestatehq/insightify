import React from 'react';
import TalentIcon from './Talent';
import {COLOR} from '../../constants/contants';
import {MaterialIcons, Foundation, MaterialCommunityIcons} from '@expo/vector-icons';

interface IconName {
  name: string // 'Deck' | 'Sky' | 'Talent' | 'More',
  isActive: boolean//true | false,
}

const SIZE = {
  HIGHEST: 25,
  MEDIUM: 20,
  SMALL: 15
}
const Icon: React.FC<IconName> = ({name, isActive}) => {
  switch (name) {
    case 'Explore':
      return <Foundation name="clipboard-notes" size={24} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
        // : <Ionicons name="book-outline" size={SIZE.MEDIUM} color={COLOR.B_300} />
    case 'Level up':
      return <MaterialCommunityIcons name="stairs-up" size={24} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
    case 'Talent':
      return <TalentIcon width={SIZE.HIGHEST} height={SIZE.HIGHEST} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
    case 'More':
      return <MaterialIcons name="more-horiz" size={SIZE.MEDIUM} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
  }
}

export default React.memo(Icon)