import {MODALS} from "./modal";
import {environments} from "../src/constants/environments";

const {STRAPI_TALENT_FORM_API_KEY, STRAPI_TOKEN} = environments;

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

  getData(endpoint: keyof typeof MODALS) {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ query: MODALS[endpoint] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        }
      };

      console.log(options)
      const _data = fetch(this.GRAPHQL_URL as string, options)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log("This is the error",error));
      console.log("Returned data: ",_data)

      // if (!_data.data) {
      //   this.data = []
      //   this.error = _data.data.error
      //   return this.results;
      // } else {
      //   this.data = _data.data
      //   this.error = null
      //   return this.results
      // }
    } catch (error) {
      this.data = []
      this.error = error as any
      return this.results
    }
  }
}

const dataModal = new DataModal();
export default dataModal;