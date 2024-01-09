import { STRAPI_TOKEN, STRAPI_BASE_URL,STRAPI_TALENT_FORM_API_KEY } from "@env"

// API endpoint /suggestions
// API fields
// - rating
// - ⁠improvements
// - ⁠suggestion
// Function to save opportunities to strapiJS database.
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
    .then(storedData => storedData)
    .catch(error => console.log(error))
  return response
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
    const response = await fetch(`${STRAPI_BASE_URL}${endpoint}`, options)
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