export const API_BASE = "https://api.unsplash.com/";

// Function to get x photos from API

// Function to select photo from above func for single photo
export const pickSingle = array => {
  let photo = array[Math.floor(Math.random() * (array.length - 1 - 0) + 0)];
  return photo;
};
