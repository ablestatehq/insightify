import { STRAPI_TOKEN, STRAPI_BASE_URL } from "@env"

// Function to save opportunities to strapiJS database.
async function storeData(endpoint: string, data:any) {
  const options = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(`${STRAPI_BASE_URL}${endpoint}`, options)
    .then(response => response.json())
    .then(storedData => storedData)
    .catch(error => { console.log(error)})

  if (response.status === 200) {
    return true
  } else {
    return false;
  }
}

// retrieve data from strapi
async function getStrapiData(endpoint: string) {
  const options = {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
    }
  }
  try {
    const response = await fetch(`https://insightify-admin.ablestate.cloud/api/${endpoint}`, options)
      .then(response => response.json())
      .then(data => data.data.map((res: any) => res.attributes))
      .catch((error:any) => { console.log(error.message) });
    
    return response;
  } catch (error) {
  }
}

export {
  storeData,
  getStrapiData
}