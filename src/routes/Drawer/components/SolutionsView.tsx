import React from 'react'
import { Linking } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from '../../../constants/contants';

const SolutionsView = () => {

  const solutions = [
    { title: 'Talent', url: 'https://www.ablestate.co/get-started' },
    { title: 'Nomoctet', url: 'https://nomoctet.ablestate.co/' },
    { title: 'API', url: 'https://apiaxess.ablestate.co/' },
    { title: 'Cloud', url: 'https://ablestate.cloud/' },
  ];

  const handleCardPress = async (url: string) => {
    // Navigate to the link in the browser upon card press
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Solutions</Text>
      <View style={styles.solutionContainer}>
        {solutions.map((solution, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(solution.url)}
            style={styles.solutionItem}
          >
            <Text style={styles.itemText}>{solution.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default SolutionsView

const styles = StyleSheet.create({
  solutionContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  container: {
    padding: 20
  },
  solutionItem: {
    marginLeft: 0,
    borderRadius: 8,
    paddingVertical:10,
    paddingHorizontal: 10,
    width: '45%',
    backgroundColor: COLOR.B_50,
    margin: 5,
    alignItems:'center'
  },
  text: {
    fontFamily:'ComfortaaBold'
  },
  itemText: {
    fontFamily:'RalewaySemiBold'
  }
})