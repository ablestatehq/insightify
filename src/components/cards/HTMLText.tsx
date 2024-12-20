import React from "react";
import {View} from "react-native";
import { CustomBlockRenderer } from "react-native-render-html";

const HTMLText:CustomBlockRenderer = function({TDefaultRenderer,...props }) {
  return (
    <View style={{
      width: '100%',
      borderRadius: 20,
    }}>
      <TDefaultRenderer {...props} style={{ padding: 1, width: '100%', marginTop:10}}>
        
      </TDefaultRenderer>
    </View>
  )
}

export default React.memo(HTMLText)