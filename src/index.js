import { Notify } from 'notiflix';
import { GetFotoPixabay } from "./get-foto"
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"

const gallery = document.querySelector(".gallery")
const search = document.querySelector(".search-form")
const loadMoreButton = document.querySelector(".load-more")

search.addEventListener("submit", onSubmitForm)
loadMoreButton.addEventListener("click", onLoadMorePhotos)

const getFotoPixabay = new GetFotoPixabay()

async function onSubmitForm(event) {
  event.preventDefault()
  clear()
  const inputValue = event.target.elements.searchQuery.value
    console.log(inputValue)

  getFotoPixabay.inputValue = inputValue
  
  try {
    const { hits, total } = await getFotoPixabay.fetchPhotos()
  if (total === 0) {
    Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    event.target.reset()
    return
  }
    Notify.success(`Hooray! We found ${total} images.`)
    renderMarkup(hits)
    loadMoreButton.classList.remove("hide")
    lightbox.refresh()
  } catch (error) { Notify.failure(error.message) }

  event.target.reset()
}

async function onLoadMorePhotos() {
  try {
  const { hits, totalHits } = await getFotoPixabay.fetchPhotos()
    renderMarkup(hits)
    lightbox.refresh()
    console.log(page)

    const { height: cardHeight } = document.querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    } catch (error) { Notify.failure(error.message) }
}

function clear() {
  gallery.innerHTML = ""
  loadMoreButton.classList.add("hide")
  getFotoPixabay.resetPage()
}

function renderMarkup(images) {
  gallery.insertAdjacentHTML("beforeend", createdMarkup(images))
}

function createdMarkup(images) {
  return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
           <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
            </a>
            </div>
            </div>`).join("")
}

function checkingOfLoadingMore(hits, total, currentPage) {
  if ((total / hits) >= currentPage) {
    loadMoreButton.classList.add("hide")
  }
}

const lightbox = new SimpleLightbox('.gallery a', { 
  captionsData: "alt",
  captionDelay: 500,
 });





// const search = document.querySelector(".search-form")

// const loadMoreButton = document.querySelector(".load-more")
// let markup = ""
// let page
// let per_page = 40
// let inputValue = ""

// search.addEventListener("submit", onSubmitForm)
// loadMoreButton.addEventListener("click", onLoadMore)

// function onSubmitForm(event) {
//   event.preventDefault();
//   page = 1
//   inputValue = event.target.elements.searchQuery.value
  
//   fetchPhotos(inputValue, page, per_page)
//     .then((images) => {
//       console.log(images.hits.length)
//       console.log(images)
//       // if(images.hits.length === 0){
//       //   Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//       //   gallery.innerHTML = ""
//       //   return
//       // }
//       //   gallery.innerHTML = ""
//       //   renderImages(images.hits)
//       })
//     .catch(error => console.log(error))
  
// }

// function renderImages(images) {
  
//   images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => { 
//   markup = `<div class="photo-card">
//             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//             <p class="info-item">
//             <b>Likes: ${likes}</b>
//             </p>
//             <p class="info-item">
//             <b>Views: ${views}</b>
//             </p>
//             <p class="info-item">
//             <b>Comments: ${comments}</b>
//             </p>
//             <p class="info-item">
//             <b>Downloads: ${downloads}</b>
//             </p>
//             </div>
//             </div>`
//   gallery.insertAdjacentHTML('afterbegin', markup)
//   }).join("")
// }

// тимориіромиіаоимр

// function onLoadMore() {
//   page +=1
//   console.log(page)  

//     fetchPhotos(inputValue, page, per_page)
//     .then((images) => {
//       console.log(images.hits.length)
//       console.log(images)
//       // if(images.hits.length === 0){
//       //   Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//       //   gallery.innerHTML = ""
//       //   return
//       // }
//       //   gallery.innerHTML = ""
//       //   renderImages(images.hits)
//       })
//     .catch(error => console.log(error))
// }