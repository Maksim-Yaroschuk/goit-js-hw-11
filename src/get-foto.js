import axios from "axios";

const PIXABAY_KEY = "28403201-b05b1c74044ac0f199d732ec5"

// export const fetchPhotos = async (searchValue, page, per_page) => {

axios.defaults.baseURL = "https://pixabay.com/api/"

//     const { data } = await axios.get(`?${options}`)
//     return data
// }

export class GetFotoPixabay {
    constructor() {
        this.searchValue = ""
        this.page = 1
    }

    async fetchPhotos() {
       
        const options = new URLSearchParams({
            key: PIXABAY_KEY,
            q: this.searchValue,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 6,
            page: this.page,
})

        const { data } = await axios.get(`?${options}`)
        this.incrPage()
        return data 
    }

    get searchValue1() {
        return this.searchValue
    }

    set searchValue1(newSearchValue) {
        this.searchValue = newSearchValue
    }

    incrPage() {
       this.page +=1
    }

    resetPage() {
        this.page = 1
    }
}
