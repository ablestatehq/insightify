import React from 'react'
import {StyleSheet, View, Text, ToastAndroid, Pressable} from 'react-native';

import CodeHighlighter from 'react-native-code-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

import * as Clipboard from 'expo-clipboard';

import {COLOR, FONTSIZE} from '@constants/constants';
import {CustomBlockRenderer} from 'react-native-render-html';
import {FONT_NAMES} from '@fonts';

const CodeSnippet: CustomBlockRenderer = ({ TDefaultRenderer, ...props }) => {

  const {tnode} = props;
  const code = tnode.domNode.firstChild?.data;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
    ToastAndroid.show('Code copied', 5000);
  };

  return (
    <View style={styles.container}>
      <TDefaultRenderer
        {...props}
        style={styles.defaultRenderer}
      >
        <CodeHighlighter
          hljsStyle={atomOneDark}
          textStyle={styles.textStyle}
          customStyle={{ borderRadius: 10 }}
          scrollViewProps={{ scrollEnabled: true, horizontal: true, nestedScrollEnabled: true }}
        >
          {code}
        </CodeHighlighter>
      </TDefaultRenderer>
      <Pressable
        style={styles.pressableClip}
        onPress={copyToClipboard}>
        <View style={styles.emptyView} />
        <View
          style={styles.copyView}>
          <Text style={styles.copyText}>COPY</Text></View>
      </Pressable>
    </View>
  );
}

export default React.memo(CodeSnippet)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    borderRadius: 20,
    backgroundColor: COLOR.CODEBACKGROUND,
    paddingRight: 2,
    overflow: 'hidden'
  },
  defaultRenderer: { padding: 10, width: 'auto' },
  textStyle: {
    fontSize: 15,
    fontFamily: 'monospace',
    backgroundColor: COLOR.CODEBACKGROUND,
    borderWidth: 0,

  },
  codeSnippet: {
    paddingHorizontal: 20,
  },
  code: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
  },
  tipFooter: {
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10
  },
  pressableClip: { position: 'absolute', right: 10, bottom: 10, elevation: 10 },
  emptyView: {
    width: 50,
    height: 25,
    backgroundColor: COLOR.WHITE,
    opacity: 0.5,
    borderRadius: 10,
    position: 'absolute',
    top: -7,
  },
  copyView: {
    width: 50,
    height: 25,
    backgroundColor: COLOR.WHITE,
    opacity: 0.95,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center'
  },
  copyText: { textAlign: 'center', fontSize: FONTSIZE.SMALL, },
})