import React from 'react'
import { Linking } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
    <View style={{
      padding: 20
    }}>
      <Text>Solutions</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {solutions.map((solution, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(solution.url)}
            style={{
              backgroundColor: '#f0f0f0',
              padding: 20,
              margin: 5,
              marginLeft: 0,
              borderRadius: 8,
              width: '45%'
            }}
          >
            <Text>{solution.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default SolutionsView;

const styles = StyleSheet.create({})