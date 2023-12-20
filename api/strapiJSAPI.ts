import { STRAPI_OPPORTUNITIES_URL, STRAPI_TOKEN } from "@env"

// Sample notification 
// [
//   {
//     "Category": "Hackthon",
//     "Company": "Appwrite",
//     "Description": [[Object]],
//     "Role": null,
//     "Title": "Win $1000 in Hackthon",
//     "URL": "https://appwrite.io",
//     "createdAt": "2023-12-16T21:34:25.087Z",
//     "expiring": "2023-12-17T21:00:00.000Z",
//     "locale": "en",
//     "publishedAt": "2023-12-16T21:34:30.470Z",
//     "updatedAt": "2023-12-18T08:16:56.331Z"
//   },
// ]
// Function to get saved opportunities from strapiJS database.[{"Category": "Hackthon", "Company": "Appwrite", "Description": [[Object]], "Role": null, "Title": "Win $1000 in Hackthon", "URL": "https://appwrite.io", "createdAt": "2023-12-16T21:34:25.087Z", "expiring": "2023-12-17T21:00:00.000Z", "locale": "en", "publishedAt": "2023-12-16T21:34:30.470Z", "updatedAt": "2023-12-18T08:16:56.331Z"}, {"Category": "Hackthon", "Company": "Devpost", "Description": [[Object]], "Role": null, "Title": "Web5: Building the Decentralized Web", "URL": "https://web5.devpost.com/?ref_feature=challenge&ref_medium=discover", "createdAt": "2023-12-18T10:04:09.369Z", "expiring": "2024-01-08T23:00:00.000Z", "locale": "en", "publishedAt": "2023-12-18T10:05:01.489Z", "updatedAt": "2023-12-18T10:05:01.510Z"}]
async function getOpportunites() {
  const options = {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
    }
  }
  const response = await fetch(STRAPI_OPPORTUNITIES_URL, options)
    .then(response => response.json())
    .then(data => {
      return data.data.map((opportunity: any) => 
        opportunity.attributes
      )
    })
    .catch((error: any) => console.warn(error.message))

  return response;
}


// Function to save opportunities to strapiJS database.
async function storeOpportunity(data: any) {
  const options = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(STRAPI_OPPORTUNITIES_URL, options)

  if (response.status === 200) {
    return true
  } else {
    return false;
  }
}
export {
  getOpportunites,
  storeOpportunity
}