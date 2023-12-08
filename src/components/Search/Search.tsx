import React from 'react'
// import { Ionicons } from '@expo/vector-icons'
import { COLOR, FONTSIZE } from '../../constants/contants'
import { StyleSheet, Text, View } from 'react-native'

const Search:React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.text}>
              {/* Discover Limitless <Text style={styles.oppStyle}> */}
              Opportunities.
              {/* </Text> */}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.searchMain}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Search...'
          />
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View> */}

      {/* Add the tags  */}
      <View>

      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  searchContainer: {
    // width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: COLOR.B_50,
    alignItems: 'center',
    elevation: 1,
    flex: 1
  },
  textInput: {
    flex: 1,
    padding: 5,
    fontFamily: 'ComfortaaBold'
  },
  text: {
    fontSize: FONTSIZE.HEADING_4,
    fontFamily: 'RalewayBold',

  },
  textContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchMain: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 10
  },
  oppStyle: {
    // color:COLOR.ORANGE_300
  }
})