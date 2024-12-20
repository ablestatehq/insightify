import {MODALS} from "./modal";
import {environments} from "../src/constants/environments";
import { STRAPI_BASE_URL } from "@env";

const {STRAPI_TOKEN, BASE_URL, NEWS_API_KEY, NEWS_URL} = environments;

async function getData(
  endpoint: keyof typeof MODALS,
  start: number = 0,
  limit: number = 25
) {
  try {
    const query = MODALS[endpoint];
    const response = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'X-REQUEST-TYPE': 'GraphQL'
      },
      body: JSON.stringify({
        query, 
        variables: { 
          start, 
          limit 
        }
      })
    });

    const responseData = await response.json();

    // Handle GraphQL errors
    if (responseData.errors) {
      return {
        data: null,
        error: responseData.errors,
        meta: null
      };
    }

    // process the data
    if (responseData.data) {
      const dataKey = Object.keys(responseData.data)[0];
      const rawData = responseData.data[dataKey];

      const results = rawData.data.map((res: any) => ({
        id: res.id,
        ...res.attributes
      }));

      return {
        data: results,
        error: null,
        meta: {
          pagination: rawData.meta?.pagination || null,
          total: rawData.meta?.pagination?.total || results.length
        }
      };
    }

    return {
      data: null,
      error: 'No data found',
      meta: null
    };

  } catch (error) {
    console.error('getData error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      meta: null
    };
  }
}

async function fetchNextBatch(endpoint: keyof typeof MODALS, currentLength: number) {
  return await getData(endpoint, currentLength, 25);
};

async function fetchNewItems(endpoint: keyof typeof MODALS) {
  const query = MODALS[endpoint];
  const response = await fetch(`${BASE_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'X-REQUEST-TYPE': 'GraphQL'
    },
    body: JSON.stringify({
      query,
      variables: {start: 0, limit: 10},
    })
  });

  const data = await response.json();

  if (data.data) {
    const newItems = data.data[`${String(endpoint)}`]['data']
      .map((res: any) => ({ id: res.id, ...res.attributes }));
    return newItems;
  }
  return [];
};

async function fetchDataByID(endpoint: string, itemID: number): Promise<{ data: any, error: any }> {
  if(endpoint && itemID) {
    try {
      const response = await fetch(`${STRAPI_BASE_URL}/${endpoint}/${itemID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        }
      });
      const data_ = await response.json();
      const data = data_?.data ? {...data_.data?.attributes, id: data_.data?.id} : null;
      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  }
  return {
    data: null,
    error: new Error('endpoint or itemID is missing')
  }
}
async function uploadImage(
  uri: string,
  jwt: string,
  refId: string,
  field: string,
  imageName: string
): Promise<{ data: any, error: any }> {
  if (!uri || !jwt || !refId || !field || !imageName) {
    return {
      data: null,
      error: new Error('Missing parameters')
    };
  }

  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    if (!blob) {
      return {
        data: null,
        error: new Error('Failed to fetch image')
      };
    }

    const mutation = `mutation UploadImage($file: Upload!, $refId: ID!, $ref: String!, $field: String!, $imageName: String!) {
      upload(
        file: $file
        name: $imageName
        refId: $refId
        ref: $ref
        field: $field
        source: "content-manager"
      ) {
        id
        url
      }
    }`;

    const variables = {
      file: {uri: uri, name: 'test.png', type: 'image/jpeg'},
      refId: refId,
      ref: "plugin::users-permissions.user",
      field: field,
      imageName: imageName
    };

    const response2 = await fetch('https://insightify-admin.ablestate.cloud/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'X-REQUEST-TYPE': 'GraphQL',
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    });

    const imageResponse = await response2.json();

    if (!imageResponse?.data) {
      return {
        data: null,
        error: imageResponse?.errors
      };
    }

    return {
      data: imageResponse?.data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error
    };
  }
}

async function get_top_news() {
   try {
    const response = await fetch(`${NEWS_URL}/news`, {
      method: 'GET',
    });

     const data = await response.json();
     return data;
   } catch (error) {
     return error;
  }
}

export {
  get_top_news,
  getData,
  fetchNewItems,
  uploadImage,
  fetchNextBatch,
  fetchDataByID
}