import React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { COLOR, FONTSIZE } from "../constants/contants";

interface CheckBoxProps{
  handleCheckBoxToggle: () => void
  checkBoxToggle: boolean
}
function CheckBox({checkBoxToggle, handleCheckBoxToggle}:CheckBoxProps) {
  return (
    <View>
      <TouchableOpacity onPress={handleCheckBoxToggle} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: 15,
          height:15,
          padding:1,
          borderWidth: 1,
          borderRadius:2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: checkBoxToggle ? COLOR.SECONDARY_300: COLOR.WHITE,
          borderColor: COLOR.SECONDARY_300,
        }}>
          {/* {checkBoxToggle && <Text style={{ color: COLOR.WHITE, fontSize:FONTSIZE.HEADING_3 }}>✓</Text>} */}
          {checkBoxToggle && <Ionicons name="checkmark-sharp" size={10} color={COLOR.WHITE} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CheckBox)