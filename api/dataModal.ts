import {MODALS} from "./modal";
import {environments} from "../src/constants/environments";

const {STRAPI_TALENT_FORM_API_KEY, STRAPI_TOKEN, STRAPI_BASE_URL} = environments;

class DataModal {
  GRAPHQL_URL = process.env.GRAPHQL_URL;
  BASE_URL = process.env.BASE_URL;

  error = null
  data = [];
  results = {};
  constructor() {
    this.results = {
      data: this.data,
      error: null,
    }
  }

  getData(endpoint: keyof typeof MODALS, start: number = 0, limit: number = 25) {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ query: MODALS[endpoint] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        }
      };

      const _data = fetch(this.GRAPHQL_URL as string, options)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {});

      if (!_data) {
        this.data = []
        this.error = _data.data.error
        return this.results;
      } else {
        this.data = _data.data
        this.error = null
        return this.results
      }
    } catch (error) {
      this.data = []
      this.error = error as any
      return this.results
    }
  };

  fetchNextBatch(endpoint: keyof typeof MODALS, currentLength: number) {
    return this.getData(endpoint, currentLength, 25);
  };

  async fetchDataByID(
    endpoint: string,
    itemID: number
  ): Promise<{ data: any, error: any }> {
    if (endpoint && itemID) {
      try {
        const response = await fetch(`${STRAPI_BASE_URL}/${endpoint}/${itemID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        });
        const data_ = await response.json();
        const data = data_?.data ? { ...data_.data?.attributes, id: data_.data?.id } : null;
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    }
    return {
      data: null,
      error: new Error('endpoint or itemID is missing')
    }
  }

  async uploadImage(
    uri: string,
    jwt: string,
    refId: string,
    field: string,
    imageName: string
  ):Promise<{ data: any, error: any }> {
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

      const mutation =
        `mutation UploadImage(
      $file: Upload!,
      $refId: ID!,
      $ref: String!,
      $field: String!,
      $imageName: String!
     ) {
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
}

const dataModal = new DataModal();
export default dataModal;