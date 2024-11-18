import { StyleSheet, Text, View, Image, Pressable, SectionList, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { NewsPost, RootStackParamList, StoryProps } from '@src/types';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../EmptyState';
import Loader from '../Loading/Loader';

const Index = ({stories, loading}: StoryProps) => {
  // hooks
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // render methods
  const renderStory = ({item}: {item: NewsPost}) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('StoryDetails', {...item})}>
      <View style={{ flex: 1, aspectRatio: 1 }}>
        {item?.featured_image &&
          <Image source={{ uri: `${item?.featured_image}` }}
          style={{ flex: 1, borderRadius: DIMEN.CONSTANT.ME }} />}
      </View>
      <View style={{flex: 0.3}}>
        <Text style={styles.title_}>{item?.title}</Text>
        <Text style={styles.author_}>By {item?.author}</Text>
      </View>
    </Pressable>
  );

  const renderMoreStory = ({item}: { item: NewsPost }) => (
    <Pressable style={styles.render_main} onPress={() => navigation.navigate('StoryDetails', { ...item })}>
      <View style={styles.textContainer}>
        <Text style={styles.title_}>{item?.title}</Text>
        <Text style={styles.author_}>By {item?.author as string}</Text>
      </View>
      <Image source={{ uri: item.featured_image }} style={styles.image_card} />
    </Pressable>
  );

  const sections = [
    {
      title: 'Featured Stories',
      data: stories.slice(0, 2),
    },
    {
      title: 'More Stories',
      data: stories.slice(2,stories.length),
    },
  ];
  return (
    <View style={styles.container}>
      {loading ? <View style={styles.loading_state}>
        <ActivityIndicator size="small" color={COLOR.PRIMARY_200} />
        </View> :
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          style={styles.sectionlist_style}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, section }) => {
            if (section.title === 'Featured Stories') {
              return null;
            } else {
              return renderMoreStory({ item });
            }
          }}
          renderSectionHeader={({ section }) => {
            if (section.title === 'Featured Stories') {
              return (
                <>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <View style={styles.card_view_style}>
                    {section.data.map((item) => renderStory({ item }))}
                  </View>
                </>
              );
            } else {
              return <Text style={styles.moreStories}>{section.title}</Text>;
            }
          }}
          contentContainerStyle={styles.scrollStyle}
          ListEmptyComponent={<EmptyState text="Stories" />}
        />}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    marginVertical: DIMEN.MARGIN.ME,
  },
  sectionlist_style: {
    marginBottom: DIMEN.CONSTANT.XLG
  },
  moreStories: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.BODY,
    marginTop: DIMEN.MARGIN.LG,
  },
  scrollStyle: {
    flexGrow: 1,
  },
  card: {
    width: '45%',
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.CONSTANT.SM,
    borderRadius: DIMEN.CONSTANT.SM,
    elevation: 3,
  },
  card_view_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  render_main: {
    flexDirection: 'row',
    padding: DIMEN.CONSTANT.ME,
    backgroundColor: COLOR.WHITE,
    borderRadius: DIMEN.CONSTANT.SM,
    shadowColor: COLOR.GREY_200,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    marginVertical: DIMEN.CONSTANT.SM,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title_: {
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Title,
    marginTop: DIMEN.CONSTANT.ME,
    textAlign: 'left',
  },
  author_: {
    fontSize: FONTSIZE.SMALL,

    color: COLOR.GREY_100,

  },
  image_card: {
    width: 80,
    height: 80,
    borderRadius: DIMEN.CONSTANT.SM,
  },
  loading_state: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
