import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ReporterComponentProps {
  name: string,
  articleLongitivity: any,
  imageUrl: any
}

const Reporter: React.FC<ReporterComponentProps> = (
  {
    name,
    articleLongitivity,
    imageUrl
  }) => {
  return (
    <View
      style={styles.container}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
        }}
      >
        <View
          style={styles.imageView}
        >
          <Image
            source={{ uri: imageUrl }}
            resizeMethod='resize'
            resizeMode='contain'
            style={styles.imageStyle}
          />
        </View>
        <Text>{name}</Text>
      </View>
      <Text>{articleLongitivity}</Text>

    </View>
  )
}

export default Reporter

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  imageView: {
    width: 50,
    height: 50,
    flexWrap: 'wrap',
    borderRadius: 25
  },
  imageStyle: {
    width: '100%',
    height: "100%",
    borderRadius: 50
  }
})