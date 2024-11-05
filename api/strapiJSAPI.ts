import {environments} from '@constants/environments'
import {clearLocalData, retrieveLocalData} from "@utils/localStorageFunctions";

const {STRAPI_TOKEN, STRAPI_BASE_URL,STRAPI_TALENT_FORM_API_KEY, BASE_URL} = environments;

/**
 * @name getMe
 * @returns
 */

async function getMe() {
  const url = `${STRAPI_BASE_URL}/users/me?populate=*`;
  const authToken = await retrieveLocalData('user_token');

  // if the authToken does not exist, return an object with null data.
  if (!authToken) return {ok: false, data: null}
  
  try {
    const jwt = authToken.token;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    };
    const reponse = await fetch(url, options)
    const data = await reponse.json();
    // user to login again
    if (data.error && authToken) {
      clearLocalData('user_token');
      return {
        ok: false,
        data: null
      }
    }

    // if data is returned from online, then return the Record that contains the data returned and a jwt.
    return { ok: true, data: data, jwt };
  } catch (error) {
    return {ok: false, data: null}
  }
};

/**
 * Function to save opportunities to strapiJS database
 * @name storeData
 * @param {string} endpoint 
 * @param {any} data 
 * @returns
 * 
 */
function storeData(endpoint: string, data: any, jwt?: string) {
  const payload = {
    "data":data
  }
  const options = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${jwt ? jwt : STRAPI_TALENT_FORM_API_KEY}`
    },
    body: JSON.stringify(payload)
  }

  const response = fetch(`${STRAPI_BASE_URL}/${endpoint}?populate=*`, options)
    .then(response => response.json())
    .then(storedData => storedData)
    .catch(error => {});
  
  return response
}

/**
 * @name getStrapiData
 * @param endpoint 
 * @returns 
 * retrieve data from strapi
 */
function getStrapiData(endpoint: string, jwt?: string, start=0, limit=25) {
  const options = {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
      'Authorization': `Bearer ${jwt ? jwt : STRAPI_TOKEN}`
    }
  }

  try {
    const response =
      fetch(`${STRAPI_BASE_URL}/${endpoint}?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`,
        options)
        .then(response => response.json())
        .then(data => {
          const _data = data?.data?.map((res: any) => {
            return {id: res.id, ...res.attributes}
          });
          return {
            data: _data,
            error: null,
            total: data?.meta?.pagination?.total,
            limit: data?.meta?.pagination?.limit,
            start: data?.meta?.pagination?.start,
          }
        })
        .catch((error: any) => ({
          data: null,
          error: error,
          total: null,
          limit: null,
          start: null
        }));
    return response;
  } catch (error) {
  }
}

async function getFilteredData(endpoint:string, field:string, operator:string, value:string) {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${environments.STRAPI_TOKEN}`
    }
  };

  try {
    const response = await
      fetch(`${environments.BASE_URL}/api/${endpoint}?filters[${field}][${operator}]=${value}`, options)
    
    const data = await response.json();

    if (data.data) {
      const results = data.data.map((res: any) => {
        const results = {
          id: res.id,
          ...res.attributes
        }

        delete results.updatedAt
        delete results.publishedAt
        delete results.locale

        return results
      });

      return Promise.resolve(results)
    } else return Promise.resolve([])

  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Update document in strapiJS
 * @name updateStrapiData()
 * @param endpoint
 * @param id
 * @param data
 * @returns 
 */
async function updateStrapiData(endpoint: string, id: number, data: any, jwt?: string) {
  const payload = {
    'data': data
  };

  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt ? jwt : STRAPI_TALENT_FORM_API_KEY}`
    },
    body: JSON.stringify(payload)
  }

  try {
    const response = await
      fetch(`${STRAPI_BASE_URL}/${endpoint}/${id}`, options)
        .then(response => response.json())
        .then(data => {
          return data
        })
        .catch(error => {})
    
    return response

  } catch (error) {
    return null
  }
}

async function deteleteStrapiData(endpoint: string, id: number, jwt?:string) {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${jwt ? jwt : STRAPI_TALENT_FORM_API_KEY}`
    }
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/${endpoint}/${id}`, options);
    const data = await response.json();
    if (data.data) {
      return {
        data,
        error: null,
      }
    } else {
      return {
        data: null,
        error: null
      }
    }
  } catch (error) {
    return {
      data: null,
      error: error
    }
  }
}

/**
 * @name getDataId
 * @param endpoint
 * @param attribute
 * @param attributeValue
 * @return id
 */
async function getDataId(endpoint: string, attribute: string, attributeValue: any) {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${STRAPI_TALENT_FORM_API_KEY}`
    }
  }

  try {
    const response = await
      fetch(`${STRAPI_BASE_URL}/${endpoint}?filters[${attribute}][$eq]=${attributeValue}`, options)
        .then(response => {
          return response.json()
        })
        .then(data => data.data.map(((res:any) => {return {token: res.attributes.tokenID, id: res.id}})))
        .catch(error => {})
    
    return response
  } catch (error) {
  }
}

/**
 * @name uploadImage
 * @param img 
 * @returns
 */
async function uploadImage(formData: FormData, jwt: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
      body: formData
    });
    const uploading = await response.json();
    return uploading
  } catch (error) {
    return null
  }
}

async function deleteImage(id: number, jwt: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/upload/files/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
    });
    const deleting = await response.json();
    return deleting;
  } catch (error) {
    return null
  }
}

async function sendConfirmationEmail(email:string, jwt: string) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({email})
    };

    const data = await (await fetch(`${STRAPI_BASE_URL}/auth/send-email-confirmation`, options)).json();
    if (data) {
      return {
        data,
        error: null
      }
    }
  } catch (error) {
    return {
      error,
      data: null
    }
  }
};

async function sendEmail(email:string, jwt: string) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        'message': 'Thank you',
        'name': 'Enock',
        'email': email
      })
    };
    const response = await (await fetch(`${STRAPI_BASE_URL}/email/`, options)).json();
    if (response) {
      return {
        data: response,
        error: null
      }
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
};

export {
  getMe,
  sendEmail,
  getFilteredData,
  storeData,
  getDataId,
  uploadImage,
  deleteImage,
  getStrapiData,
  deteleteStrapiData,
  updateStrapiData,
  sendConfirmationEmail,
}