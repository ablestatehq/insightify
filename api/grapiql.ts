import {MODALS} from "./modal";
import {environments} from "../src/constants/environments";

const {STRAPI_TOKEN, BASE_URL} = environments;

async function getData(endpoint: keyof typeof MODALS, start: number = 0, limit: number = 25) {
  try {
    const query = MODALS[endpoint];
    const response = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'X-REQUEST-TYPE': 'GraphQL'
      },
      body: JSON.stringify({query, variables: {start, limit}})
    });

    const data = await response.json();

    if (data.data) {
      const hasMore = start + limit < data.data[`${endpoint}`].meta.pagination.total;
      const results = data.data[`${endpoint}`]['data'].map((res: any) => {
        return {id: res.id, ...res.attributes}
      });
      return {
        data: results,
        error: null,
        hasMore: hasMore,
      }
    }
    return {
      data: null,
      error: data?.error,
      hasMore: false,
    }

  } catch (error) {
    return {
      error,
      data: null,
      hasMore: false
    }
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
    const newItems = data.data[`${endpoint}`]['data']
      .map((res: any) => ({ id: res.id, ...res.attributes }));
    return newItems;
  }
  return [];
};

async function createEntry(endpoint: string, data: any) {
  try {
    const createData = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'X-REQUEST-TYPE': 'GraphQL'
      },
    })
  } catch (error) {
    return {
      error, 
      data: null
    }
  }
}

async function uploadImage(uri: string, jwt: string, refId: string, field: string, imageName: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
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
  }`

  const variables = {
    file: {uri: uri, name: 'test.png', type: 'image/jpeg'},
    refId: refId,
    ref: "plugin::users-permissions.user",
    field: field,
    imageName: imageName
  };

  try {
    const response = await fetch('https://insightify-admin.ablestate.cloud/graphql', {
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

    const imageResponse = await response.json();

    if (imageResponse?.data) {
      return {
        data: imageResponse?.data,
        error: null
      };
    } else {
      return {
        data: null,
        error: imageResponse?.errors
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error
    };
  }
}


async function login(email:string, password: string) {
  const mutation = `mutation {
  login(input: { identifier: ${email}, password: ${password} }) {
    jwt
  }`;
}

export {
  getData,
  uploadImage,
  createEntry,
  fetchNewItems,
  fetchNextBatch,
}