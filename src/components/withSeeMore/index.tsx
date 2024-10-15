import React from "react";
import {View, StyleSheet} from 'react-native';
import SeeMore from "../SeeMore";

interface WithSeeMoreProps<P> {
  Component: React.ComponentType<P>
  title: string
  onPress?: () => void;
}

function Index<P extends object>(props: WithSeeMoreProps<P> & P) {
  const {Component, title, onPress, ...rest} = props;
    return (
      <View style={styles.container}>
        <SeeMore title={title} onPress={onPress}/>
        <Component {...rest as P} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    // flex: 1,
    marginTop: 5,
  }
})
export default Index;