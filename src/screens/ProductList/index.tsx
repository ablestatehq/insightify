import ProductItem from './ProductItem';
import React, {useContext} from 'react';
import {COLOR} from '../../constants/constants';
import {FlatList, Text, View} from 'react-native';
import {RootStackParamList} from '../../utils/types';
import Header from '../../components/Headers/Header';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../helper/context/AppContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Index = () => {
  const renderProducts = ({item, index}:{item: any, index: number}) =>
    <ProductItem
      verified={false}
      name={item?.name}
      description={item?.description}
      media={item?.media}
      views={0}
      tagline={item?.tagline}
      id={item?.id}
    />

  const EmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No products available</Text>
    </View>
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {products} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header title='Products' />
      <FlatList
        data={products}
        renderItem={renderProducts}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
}

export default Index;

const styles = {
  container: {
    flex:1,
    backgroundColor: COLOR.WHITE,
  },
  flatList: {
    flex: 1,
  },
  listStyle: {
    paddingHorizontal: 10,
    marginTop: 5,
  }
}
