import { fetchPhotos } from "./get-foto";
import { Notify } from 'notiflix';

const search = document.querySelector(".search-form")
const gallery = document.querySelector(".gallery")
let markup = ""
search.addEventListener("submit", onSubmitForm)

function onSubmitForm(event) {
  event.preventDefault();
  const inputValue = event.target.elements.searchQuery.value
  
  fetchPhotos(inputValue)
    .then((images) => {
      console.log(images.data.hits.length)
      if(images.data.hits.length === 0){
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        gallery.innerHTML = ""
        return
      }
        gallery.innerHTML = ""
        renderImages(images.data.hits)
      })
      .catch(error => console.log(error))
}

function renderImages(images) {
  images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => { 
  markup = `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
            <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${downloads}</b>
            </p>
            </div>
            </div>`
  gallery.insertAdjacentHTML('afterbegin', markup)
  }).join("")
}