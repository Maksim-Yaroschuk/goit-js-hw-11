import { fetchPhotos } from "./get-foto";

const search = document.querySelector(".search-form")

search.addEventListener("submit", onSubmitForm)

function onSubmitForm(event) {
     event.preventDefault();
     const inputValue = event.target.elements.searchQuery.value
     console.log(inputValue)
     console.log(fetchPhotos(inputValue))
}

