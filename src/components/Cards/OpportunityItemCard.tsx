import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HTML from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';

// Constants and Helpers
import { COLOR, FONTSIZE } from '../../constants/constants';
import { AppContext } from '../../helper/context/AppContext';
import { OpportunityItemCardProps } from '../../utils/types';
import { OpenLink, handleBookmark } from '../../helper/functions/handleFunctions';
import { generateDate } from '../../helper/functions/functions';
import { environments } from '../../constants/environments';
import OpportunityFooter from './OpportunityFooter';
import { FONT_NAMES } from '../../assets/fonts/fonts';

const OpportunityItemCard: React.FC<OpportunityItemCardProps> = ({ opportunity, showReportModal }) => {
  const { setOpportunities, opportunities, isLoggedIn } = useContext(AppContext);
  const { BASE_URL } = environments;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const {
    Title,
    Category,
    Role,
    URL,
    Expires,
    Location,
    publishedAt,
    compensation,
    Contact,
    company_logo,
    cover_image,
    Company,
    Description,
    bookmarked,
    id,
  } = opportunity;

  const deadline = Expires ? generateDate(Expires).date : null;
  const [expandable, setExpandable] = useState<boolean>(false);

  const toggleExpandable = () => {
    setExpandable(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headSection}>
        <View style={styles.logoContainer}>
          <View style={[styles.logo, {
            backgroundColor: company_logo.data?.attributes?.url ? COLOR.WHITE : COLOR.SECONDARY_300
          }]}>
            {company_logo.data ? (
              <Image source={{ uri: `${BASE_URL}${company_logo.data?.attributes?.url}` }} style={styles.logoImage} />
            ) : (
              <Text style={styles.logoText}>{Category === 'Job' ? Category : 'Dev'}</Text>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.heading}>{Title}</Text>
            <Text style={styles.company}>{Company}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.description} onPress={toggleExpandable}>
        {cover_image.data && <Image source={{ uri: cover_image.data.attributes.url }} style={styles.coverImage} />}
        <HTML
          contentWidth={100}
          source={{ html: Description }}
          defaultTextProps={{
            numberOfLines: expandable ? 10 : 2,
            style: styles.descriptionText,
          }}
        />
      </TouchableOpacity>

      {expandable && (
        <View style={styles.additionalInfo}>
          {compensation && <Text style={styles.compensation}>Compensation: {compensation}</Text>}
          {deadline && <Text style={styles.deadline}>Deadline: {deadline}</Text>}
          <Pressable style={styles.applyButton} onPress={() => OpenLink(URL)}>
            <Text style={styles.applyButtonText}>Apply</Text>
            <AntDesign name="arrowright" size={19} color={COLOR.SECONDARY_200} />
          </Pressable>
        </View>
      )}

      <OpportunityFooter
        link={URL}
        bookmarked={bookmarked}
        handleBookmark={() => {
          if (isLoggedIn) {
            handleBookmark(id, opportunities, setOpportunities);
          } else {
            navigation.navigate('Login', { title: 'Login to save \nthis Opportunity', opportunityID: id });
          }
        }}
        publishedDate={publishedAt}
        showReportModal={showReportModal}
        location={Location ?? 'Remote'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    backgroundColor: COLOR.WHITE,
    borderRadius: 5,
  },
  headSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  logoImage: {
    alignSelf: 'center',
    height: 40,
    width: 40,
  },
  logoText: {
    textAlign: 'center',
    color: COLOR.WHITE,
  },
  titleContainer: {
    flex: 1,
  },
  heading: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Title,
    flexWrap: 'wrap',
  },
  company: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
  },
  description: {
    padding: 5,
  },
  descriptionText: {
    fontFamily: FONT_NAMES.Body,
    fontSize: 16,
  },
  additionalInfo: {
    padding: 5,
    alignItems: 'flex-start',
  },
  compensation: {
    fontFamily: FONT_NAMES.Heading,
  },
  deadline: {
    textAlign: 'right',
  },
  applyButton: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: COLOR.SECONDARY_50,
    borderRadius: 50,
    marginTop: 10
  },
  applyButtonText: {
    color: COLOR.SECONDARY_500,
  },
  coverImage: {},
});

export default React.memo(OpportunityItemCard);