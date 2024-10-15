import {environments} from "../src/constants/environments";
import {MODALS} from "./modal";

const {STRAPI_TOKEN, BASE_URL, STRAPI_TALENT_FORM_API_KEY} = environments;

async function getData(endpoint: keyof typeof MODALS) {
  try {
    const query = MODALS[endpoint];
    const response = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'X-REQUEST-TYPE': 'GraphQL'
      },
      body: JSON.stringify({query})
    });

    const data = await response.json();

    if (data.data) {
      const results = data.data[`${endpoint}`]['data'].map((res: any) => {
        return { id: res.id, ...res.attributes }
      });
      return {
        data: results,
        error: null
      }
    }
    return {
      data: null,
      error: data?.error
    }

  } catch (error) {
    return {
      error,
      data: null
    }
  }
}

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
    console.log(imageResponse?.errors);

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
  createEntry
}