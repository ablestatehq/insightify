import ProductItem from './ProductItem';
import React, { useCallback, useState } from 'react';
import { COLOR } from '@constants/constants';
import { FlatList, RefreshControl, View } from 'react-native';
import Header from '@components/Headers/Header';
import { ProductData } from '@src/types';
import { useProducts } from '@src/hooks';
import { EmptyState, ListFooter } from '@src/components';
import { fetchNewItems } from '@api/grapiql';

const Index = () => {
  // state
  const [loadings, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const renderProducts = ({ item, index }: { item: ProductData, index: number }) =>
    <ProductItem key={index} {...item} />

  const { products, fetchAdditionalData, setProducts } = useProducts();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const newProducts = await fetchNewItems('products');
      setProducts(prev => {
        const existingIds = prev.map((item) => item.id);
        const new_products = newProducts.filter((item: ProductData) => !existingIds.includes(item.id));
        return [...new_products, ...prev];
      });
    } catch (error) {

    } finally {
      setRefreshing(false);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }
  const handleEndReached = useCallback(async () => {
    setLoading(true);
    try {
      await fetchAdditionalData('products', products.length);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }, [products.length]);

  return (
    <View style={styles.container}>
      <Header title='Products' />
      <FlatList
        data={products}
        renderItem={renderProducts}
        contentContainerStyle={styles.flatList}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<EmptyState text='No products available' />}
        ListFooterComponent={<ListFooter loading={loadings} text='No more products' />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.6}
        windowSize={5}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLOR.PRIMARY_300]}
          />
        }
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
