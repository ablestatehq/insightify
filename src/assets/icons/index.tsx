import { Image, StyleSheet, View, Text } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { COLOR } from '../../constants/contants';
import TalentIcon from './Talent';

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
    case 'Deck':
      return isActive == true
        ? <Ionicons name="book" size={SIZE.MEDIUM} color={COLOR.ORANGE_300} />
        : <Ionicons name="book-outline" size={SIZE.MEDIUM} color={COLOR.B_300} />
    case 'Sky':
      return <Feather name="arrow-up-right" size={SIZE.MEDIUM} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
    case 'Talent':
      return <TalentIcon width={SIZE.HIGHEST} height={SIZE.HIGHEST} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
    case 'More':
      return <MaterialIcons name="more-horiz" size={SIZE.MEDIUM} color={isActive ? COLOR.ORANGE_300 : COLOR.B_300} />
  }
}

export default Icon

const styles = StyleSheet.create({})