import ProductItem from './ProductItem';
import React, { useContext } from 'react';
import { COLOR } from '@constants/constants';
import { FlatList, Text, View } from 'react-native';
import Header from '@components/Headers/Header';
import { AppContext } from '@src/context/AppContext';
import { ProductData } from '@src/types';

const Index = () => {
  const renderProducts = ({ item, index }: { item: ProductData, index: number }) =>
    <ProductItem key={index} {...item} />

  const EmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No products available</Text>
    </View>
  );

  const { products } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header title='Products' />
      <FlatList
        data={products}
        renderItem={renderProducts}
        contentContainerStyle={styles.flatList}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
}

export default Index;

const styles = {
  container: {
    flex: 1,
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
