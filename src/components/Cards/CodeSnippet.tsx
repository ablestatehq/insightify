import React from 'react'
import {StyleSheet, View, Text, ToastAndroid, Pressable} from 'react-native';

import CodeHighlighter from 'react-native-code-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

import * as Clipboard from 'expo-clipboard';

import {COLOR, FONTSIZE} from '../../constants/contants';
import {CustomBlockRenderer} from 'react-native-render-html';

const CodeSnippet: CustomBlockRenderer = ({TDefaultRenderer, ...props}) => {

  const {tnode} = props;
  const code = tnode.domNode.firstChild?.data;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
    ToastAndroid.show('Code copied', 5000);
  };

  return (
    <View style={{
      width: '100%',
      padding: 5,
      borderRadius: 20,
      backgroundColor: COLOR.CODEBACKGROUND,
      paddingRight: 2,
      overflow:'hidden'
    }}>
      <TDefaultRenderer
        {...props}
        style={{ padding: 10, width:'auto'}}
      >
        <CodeHighlighter
          hljsStyle={atomOneDark}
          textStyle={{
            fontSize: 15,
            fontFamily: 'monospace',
            backgroundColor: COLOR.CODEBACKGROUND,
            borderWidth:0
          }}
          customStyle={{ borderRadius: 10 }}
          scrollViewProps={{ scrollEnabled: true, horizontal:true, nestedScrollEnabled:true}}
        >
          {code}
        </CodeHighlighter>
      </TDefaultRenderer>
      <Pressable
        style={{ position: 'absolute', right: 10, bottom: 10, elevation: 10 }}
        onPress={copyToClipboard}>
        <View style={{width: 50, height:25, backgroundColor:COLOR.WHITE, opacity:0.5, borderRadius:10, position:'absolute', top:-7}}/>
        <View
          style={{
            width: 50,
            height: 25,
            backgroundColor: COLOR.WHITE,
            opacity: 0.95,
            borderRadius: 10,
            elevation: 5,
            justifyContent:'center'
          }}>
          <Text style={{ textAlign: 'center', fontSize: FONTSIZE.SMALL, }}>COPY</Text></View>
      </Pressable>
    </View>
  );
}

export default React.memo(CodeSnippet)

const styles = StyleSheet.create({
  codeSnippet: {
    paddingHorizontal: 20,
  },
  code: {
    fontFamily: 'RalewayBold',
    fontSize: FONTSIZE.BODY,
  },
  tipFooter: {
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10
  },
})