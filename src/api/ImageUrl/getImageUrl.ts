import axios from "axios";

// Get the image URL
export default async function getImageUrl(id:number) {
  try {
    return axios
      .get(`https://techinafrica.com/wp-json/wp/v2/media/${id}`)
      .then(mediaData => {
        return mediaData.data.source_url;
      }).catch(error => {
        console.log("Error has occured in the getImageUrl", error);
      })
  } catch (error) {
    console.log("Error in fetching the Image URL");
  }
}