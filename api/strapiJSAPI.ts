import {environments} from '../src/constants/environments'
import {clearLocalData, retrieveLocalData} from "../src/utils/localStorageFunctions";


const {STRAPI_TOKEN, STRAPI_BASE_URL,STRAPI_TALENT_FORM_API_KEY, BASE_URL} = environments;
/**
 * @name getMe
 * @returns
 */
async function getMe() {
  const url = `${STRAPI_BASE_URL}/users/me?populate=*`;
  const authToken = await retrieveLocalData('user_token')

  // console.log(authToken)
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
  } catch (error) {}
  return {ok: false, data: null}
};

/**
 * Function to save opportunities to strapiJS database
 * @name storeData
 * @param {string} endpoint 
 * @param {any} data 
 * @returns
 * 
 */
async function storeData(endpoint: string, data: any) {
  // posting data to strapi-backend server
  const payload = {
    "data":data
  }
  const options = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TALENT_FORM_API_KEY}`
    },
    body: JSON.stringify(payload)
  }

  const response = fetch(`${STRAPI_BASE_URL}/${endpoint}`, options)
    .then(response => response.json())
    .then(storedData => {
      // console.log("Data saved", storedData)
      return storedData
    })
    .catch(error => console.error(error))
  return response
}

/**
 * @name getStrapiData
 * @param endpoint 
 * @returns 
 * retrieve data from strapi
 */
function getStrapiData(endpoint: string) {
  const options = {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
      'Authorization': `Bearer ${endpoint == 'notification-tokens' ? STRAPI_TALENT_FORM_API_KEY : STRAPI_TOKEN}`
    }
  }

  try {
    const response = fetch(`${STRAPI_BASE_URL}/${endpoint}?populate=*`, options)
      .then(response => response.json())
      .then(data => {
        if (endpoint == 'notification-tokens') {
          return data.data.map((res: any) => res.attributes.tokenID)
        }
        return data?.data?.map((res:any) => {
         return {id: res.id, ...res.attributes}
        })
      })
      .catch((error:any) => { console.log(error.message) });
    return response;
  } catch (error) {
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
async function updateStrapiData(endpoint: string, id: number, data: any) {
  const payload = {
    'data': data
  };

  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TALENT_FORM_API_KEY}`
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
        .catch(error => console.warn(error))
    
    return response

  } catch (error) {
    return null
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
        .catch(error => console.warn(error))
    
    return response
  } catch (error) {
  }
}

/**
 * @name uploadImage
 * @param img 
 * @returns 
 */
async function uploadImage(img: string, id: number, ref: string, field: string, jwt: string) {
  
  const response = await fetch(img);
  const blob = await response.blob();
  
  const formData = new FormData();
  console.log("This is the uri: ",formData)
  formData.append('files', blob);
  formData.append('refId', id.toString());
  formData.append('ref', ref);
  formData.append('field', field);

  try {
    const response = await fetch(`https://insightify-admin.ablestate.cloud/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${jwt}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) return {data, error: data.error}
    else return {
      error: null,
      data
    };
  } catch (error) {
    return {
      error: error,
      data: null
    }
  }
}

export {
  getMe,
  storeData,
  getDataId,
  uploadImage,
  getStrapiData,
  updateStrapiData
}