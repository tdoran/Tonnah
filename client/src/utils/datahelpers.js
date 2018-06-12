const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

// Function to get x photos from API
export const getData = () => {
  return fetch(`https://gif-set-match.herokuapp.com/getGifs`)
    .then(res => res.json())
    .catch(err => {
      console.log(err.message);
    });
};

// Function to make array of image urls from api response

export const makeImageArray = obj => {
  const parsed = JSON.parse(obj);
  return parsed.data.map(gif => [gif.images.downsized_medium.url, gif.title]);
};

// Function to select photo from above func for single photo
export const pickSingle = array => {
  let photo = array[Math.floor(Math.random() * (array.length - 1 - 0) + 0)];
  return photo;
};

// Function to shuffle gif array
export const shuffle = array => array.sort((a, b) => 0.5 - Math.random());
