import axios from "axios";

const PIXABAY_KEY = "28403201-b05b1c74044ac0f199d732ec5"

axios.defaults.baseURL = "https://pixabay.com/api/"

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
            per_page: 40,
            page: this.page,
})

        const { data } = await axios.get(`?${options}`)
        this.incrPage()
        return data
    }

    get inputValue() {
        return this.searchValue
    }

    set inputValue(newSearchValue) {
        this.searchValue = newSearchValue
    }

    incrPage() {
       this.page +=1
    }

    resetPage() {
        this.page = 1
    }
}
