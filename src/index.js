import { fetchPhotos } from "./get-foto";
import { Notify } from 'notiflix';

const search = document.querySelector(".search-form")
const gallery = document.querySelector(".gallery")
const loadMoreButton = document.querySelector(".load-more")
let markup = ""
let page
let per_page = 40
let inputValue = ""

search.addEventListener("submit", onSubmitForm)
loadMoreButton.addEventListener("click", onLoadMore)

function onSubmitForm(event) {
  event.preventDefault();
  page = 1
  inputValue = event.target.elements.searchQuery.value
  
  fetchPhotos(inputValue, page, per_page)
    .then((images) => {
      console.log(images.hits.length)
      console.log(images)
      // if(images.hits.length === 0){
      //   Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      //   gallery.innerHTML = ""
      //   return
      // }
      //   gallery.innerHTML = ""
      //   renderImages(images.hits)
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

function onLoadMore() {
  page +=1
  console.log(page)  

    fetchPhotos(inputValue, page, per_page)
    .then((images) => {
      console.log(images.hits.length)
      console.log(images)
      // if(images.hits.length === 0){
      //   Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      //   gallery.innerHTML = ""
      //   return
      // }
      //   gallery.innerHTML = ""
      //   renderImages(images.hits)
      })
    .catch(error => console.log(error))
}