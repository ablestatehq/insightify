import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

//renderer
import HTML from 'react-native-render-html';

import {COLOR, FONTSIZE} from '../../constants/contants';
import {AppContext} from '../../helper/context/AppContext';
import {OpportunityItemCardProps} from '../../utils/types';

import OpportunityFooter from './OpportunityFooter';
import {OpenLink, handleBookmark} from '../../helper/functions/handleFunctions';
import {generateDate} from '../../helper/functions/functions';
import {AntDesign} from '@expo/vector-icons';
import {environments} from '../../constants/environments';

const OpportunityItemCard: React.FC<OpportunityItemCardProps> =
  ({
    opportunity,
    showReportModal
  }) => {
    const {setOpportunities, opportunities, isLoggedIn} = useContext(AppContext);

    const {BASE_URL} = environments;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {Title, Category,Role,URL,Expires, Location,publishedAt, compensation, Contact,company_logo, cover_image, Company, Description, bookmarked, id} = opportunity;
    
    // const {date} = generateDate(createdAt);
    const deadline = Expires ? generateDate(Expires).date : null;

    // useStates
    const [expandable, setExpandable] = useState<boolean>(false);

    const handleExpandable = () => {
      setExpandable(value => !value);
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.headSection}>
          <View style={{flex: 1, paddingTop: 10, flexDirection: 'row', overflow: 'hidden', gap: 15}}>
            <View style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              backgroundColor: (company_logo.data?.attributes?.url == undefined) ? COLOR.SECONDARY_300 : COLOR.WHITE,
              borderRadius: 5,
            }}>
              {company_logo.data && <Image source={{ uri: `${BASE_URL}${company_logo.data?.attributes?.url}` }} height={40} width={40} style={{alignSelf:'center'}} />}
              {!company_logo.data && <Text style={{ textAlign: 'center', color: COLOR.WHITE }}>{Category == 'Job' ? Category : 'Dev'}</Text>}
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.heading}>{Title}</Text>
              <Text style={styles.company}>{Company}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.description}
          onPress={handleExpandable}
        >
          {cover_image.data && <Image source={{ uri: cover_image.data.attributes.url }} />}
          <HTML
            contentWidth={100}
            source={{ html: Description }}
            defaultTextProps={{
              numberOfLines: expandable ? 10 : 2,
              style: { fontFamily: 'LatoRegular', fontSize: 16 }
            }}
          />
        </TouchableOpacity>
        {expandable && (<View style={styles.description}>
          {compensation && <Text style={{fontFamily:'ComfortaaBold'}}>Compesation: {compensation}</Text>}
          {deadline && <Text style={{ textAlign: 'right' }}>Deadline: {deadline}</Text>}
          <Pressable style={styles.visitStyle} onPress={() => OpenLink(URL)}>
            <Text style={styles.visitText}>Apply</Text>
            <AntDesign name="arrowright" size={19} color={COLOR.SECONDARY_200} />
          </Pressable>
        </View>)}

        <OpportunityFooter
          link={URL}
          bookmarked={bookmarked}
          handleBookmark={function (): void {
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
    )
  }

export default React.memo(OpportunityItemCard)

const styles = StyleSheet.create({
  container: {
    elevation: 0.5,
    marginBottom: 10,
    paddingRight: 10,
    backgroundColor: COLOR.WHITE
  },
  headSection: {
    gap: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: 'RalewayBold',
    flexWrap: 'wrap'
  },
  description: {
    padding: 10,
    alignItems:'flex-start'
  },
  footer: {
    borderTopColor: COLOR.SECONDARY_50,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingLeft: 10
  },
  text: {
    fontSize: FONTSIZE.BODY,
    fontFamily: 'RalewayMedium',
  },
  linkText: {
    fontFamily: 'RalewayLight',
    fontSize: FONTSIZE.SMALL,
  },
  btn: {
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.TITLE_2,
    textAlign: 'center',
    color: COLOR.PRIMARY_300
  },
  location: {
    color: COLOR.SECONDARY_75
  },
  visitText: {
    color: COLOR.SECONDARY_500,
  },
  visitStyle: {
    gap: 10,
    paddingVertical: 5,
    // paddingBottom:7,
    flexDirection: 'row',
    backgroundColor: COLOR.SECONDARY_50,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
    
    // alignItems:'flex-start'
  },
  company: {
    fontFamily: 'RalewayRegular',
    fontSize:FONTSIZE.SMALL
  },
  contact: {

  }
})