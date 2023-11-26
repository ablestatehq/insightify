import axios from "axios";

// import { environments } from "../../src/constants/environments";

// const { TECH_IN_AFRICA } = environments;

// Get the articles.
export default async function getArticles() {
  try {
    return await axios
      .get('https://www.techinafrica.com/wp-json/wp/v2/posts')
      .then(response => {
        return response.data;
      })
  } catch (error) {
    console.log("Error in fetching the articles",error)
  }
}