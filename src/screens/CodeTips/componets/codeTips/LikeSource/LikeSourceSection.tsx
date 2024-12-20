import React from 'react'
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { COLOR } from '@constants/constants'
import onShare from '@utils/onShare'

interface LikeSourceSectionProps {
  sourceName: string
  sourceLink: string
}
const LikeSourceSection = (
  {
    sourceName,
    sourceLink
  }: LikeSourceSectionProps
) => {
  const [favorite, setFavorite] = React.useState<boolean>(false);

  const apps = ['twitter', 'linkedin', 'instagram', 'facebook']

  const handleOpenLink = async () => {
    const openIn = apps.find(app => sourceLink.includes(app))
    if (openIn) {
      if (Platform.OS === 'android') {
        const url = sourceLink.startsWith('http') ? sourceLink : `https://${sourceLink}`;
        Linking.openURL(url)
          .then(response => {
          })
          .catch(error => {
            // Provide a user-friendly message here to inform the user about the issue.
          });
      }
    }
  }

  return (
    <View
      style={styles.sourceContainer}
    >
      <View
        style={styles.favoriteStyle}
      >
        {!favorite &&
          <AntDesign
            style={styles.heartStyle}
            name="hearto"
            size={24}
            color="black"
          />
        }
        {!!favorite &&
          <AntDesign
            style={styles.heartStyle}
            name="heart"
            size={24}
            color="black"
          />
        }
      </View>
      <Pressable
        style={styles.sourceLinkContainer}
        onPress={handleOpenLink}
      >
        <View>
          <Text>Source:</Text>
          <Text># {sourceName}</Text>
        </View>
        <FontAwesome
          name="location-arrow"
          size={24}
          color="black"
        />
      </Pressable>
      <View
        style={styles.favoriteStyle}
      >
        <MaterialCommunityIcons
          name="share-outline"
          size={25}
          color="black"
          onPress={() => onShare(sourceLink)}
        />
      </View>
    </View>
  )
}

export default LikeSourceSection

const styles = StyleSheet.create({
  sourceContainer: {
    width: '90%',
    bottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    color: COLOR.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },

  sourceLinkContainer: {
    width: "70%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteStyle: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
  },
  heartStyle: {
    alignSelf: "center"
  }
})