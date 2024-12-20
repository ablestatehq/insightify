import { fetchNextBatch, getData } from "@api/grapiql";
import { environments } from "@constants/environments";
import { ProductData } from "@src/types";
import { storeToLocalStorage } from "@src/utils/localStorageFunctions";
import React, { createContext, useContext, useEffect, useState } from "react";
import fetchWithCache from '@src/utils/fetch-with-cache';

interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

interface Comment {
  readonly id: number;
  content: string
  blocked?: null;
  blockedThread?: boolean;
  blockReason?: null;
  authorUser?: null;
  removed?: null;
  approvalStatus?: string;
  author?: Author;
  threadOf?: number;
  createdAt?: string,
  updatedAt?: string,
  reports?: []
};

interface ProductContextType {
  products: ProductData[];
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
  fetchComments: (id: number) => Promise<Comment[]>;
  toggleBookmark: (id: number) => void;
  submitComment: (id: number, comment: string, jwt: string) => Promise<Comment | null>;
  fetchAdditionalData: (endpoint: string, start: number) => Promise<void>;
};

const { BASE_URL, STRAPI_TOKEN } = environments;

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductData[]>([]);

  const toggleBookmark = (productId: number) => {
    const updatedProducts = products.map((product: ProductData) => {
      if (product.id === productId) {
        const updatedProduct = {
          ...product,
          meta: { ...product.meta, bookmarked: !product.meta?.bookmarked },
        };
        return updatedProduct;
      }
      return product;
    });

    setProducts(updatedProducts);
    storeToLocalStorage('products', updatedProducts);
  };

  const fetchProducts = async () => {
    const products_data = await fetchWithCache('products', () => getData('products'))

    setProducts(products_data);
  };

  const fetchComments = async (id: number,) => {
    const com_response = await (await fetch(`${BASE_URL}/api/comments/api::product.product:${id}?populate=author`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
    })).json();

    if (com_response) {
      return com_response;
    } else {
      return [];
    }
  }

  const submitComment = async (id: number, comment: string, jwt: string) => {
    if (comment.trim()) {
      const newCom: Omit<Comment, "id"> = {
        content: comment,
      }

      const com_response = await (await fetch(`${BASE_URL}/api/comments/api::product.product:${id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(newCom)
      })).json()

      if (com_response) {
        return com_response;
      }
      return null
    }
  }

  const fetchAdditionalData = async (endpoint: string, start: number) => {
    try {
      const newProducts = await fetchNextBatch('products', start as number);
      if (!newProducts.data && newProducts.error) {
        return;
      }
      setProducts(prev => {
        const existingIds = prev.map((item) => item.id);
        const filteredProducts = newProducts.data.filter((item: any) => !existingIds.includes(item.id));
        return [...prev, ...filteredProducts];
      });
    } catch (error: any) { }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      fetchComments,
      toggleBookmark,
      submitComment,
      fetchAdditionalData
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};


export default ProductProvider;