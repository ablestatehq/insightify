import { STRAPI_TOKEN, STRAPI_BASE_URL,STRAPI_TALENT_FORM_API_KEY } from "@env"

/**
 * @name storeData
 * @param endpoint 
 * @param data 
 * @returns 
 * Function to save opportunities to strapiJS database
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

  const response = await fetch(`${STRAPI_BASE_URL}${endpoint}`, options)
    .then(response => response.json())
    .then(storedData => {
      // console.log("Data saved", storedData)
      return storedData
    })
    .catch(error => console.log(error))
  return response
}

/**
 * @name getStrapiData
 * @param endpoint 
 * @returns 
 * retrieve data from strapi
 */
async function getStrapiData(endpoint: string) {
  const options = {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
      'Authorization': `Bearer ${endpoint == 'notification-tokens' ? STRAPI_TALENT_FORM_API_KEY : STRAPI_TOKEN}`
    }
  }

  // console.log(`${endpoint}`,options)
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${endpoint}`, options)
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
      fetch(`${STRAPI_BASE_URL}${endpoint}/${id}`, options)
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
      fetch(`${STRAPI_BASE_URL}${endpoint}?filters[${attribute}][$eq]=${attributeValue}`, options)
        .then(response => {
          return response.json()
        })
        .then(data => data.data.map(((res:any) => {return {token: res.attributes.tokenID, id: res.id}})))
        .catch(error => console.warn(error))
    
    return response
  } catch (error) {
  }
}
export {
  storeData,
  getDataId,
  getStrapiData,
  updateStrapiData
}