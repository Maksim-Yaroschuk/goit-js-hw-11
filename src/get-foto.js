import axios from "axios";

const PIXABAY_KEY = "28403201-b05b1c74044ac0f199d732ec5"

export const fetchPhotos = (searchValue) => {

const options = new URLSearchParams({
    key: PIXABAY_KEY,
    q: searchValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
})

axios.defaults.baseURL = "https://pixabay.com/api/"

return axios.get(`?${options}`)
}
