import { token } from "../../token.js";

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

// Function to get x photos from API
export const getData = () => {
  return fetch(
    `http://api.giphy.com/v1/stickers/trending?limit=200&api_key=${token}`
  )
    .then(checkResponse)
    .catch(err => {
      console.log(err.message);
    });
};

// Function to make array of image urls from api response

export const makeImageArray = obj => {
  return obj.data.map(gif => [gif.images.downsized_medium.url, gif.title]);
};

// Function to select photo from above func for single photo
export const pickSingle = array => {
  let photo = array[Math.floor(Math.random() * (array.length - 1 - 0) + 0)];
  return photo;
};

// Function to shuffle gif array
export const shuffle = array => array.sort((a, b) => 0.5 - Math.random());
