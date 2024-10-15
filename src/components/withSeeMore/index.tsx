import React from "react";
import {View, StyleSheet} from 'react-native';
import {SeeMore} from "..";

interface WithSeeMoreProps<P> {
  Component: React.ComponentType<P>
  title: string
  onPress: () => void;
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
    paddingHorizontal: 10,
    flex: 1,
    marginTop: 15,
  }
})
export default Index;