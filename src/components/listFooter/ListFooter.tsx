import { FONT_NAMES } from "@src/assets";
import { COLOR, FONTSIZE } from "@src/constants";
import { View, ActivityIndicator, Text } from "react-native";

interface Props {
  loading: boolean;
  text: string;
}
const ListFooter = ({ loading, text }: Props) => {
  return (
    <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}} >
      {loading ?
        (<ActivityIndicator size="small" color={COLOR.PRIMARY_300} />)
        : (<Text style={{color: COLOR.GREY_100, fontSize: FONTSIZE.SMALL, fontFamily: FONT_NAMES.Body}}>{text}</Text>)
      }
    </View>
  )
}

export default ListFooter;