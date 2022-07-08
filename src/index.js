import { Notify } from 'notiflix';
import { GetFotoPixabay } from "./get-foto"
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"

const gallery = document.querySelector(".gallery")
const search = document.querySelector(".search-form")
const loadMoreButton = document.querySelector(".load-more")
const checkboxActInfScr = document.getElementById("activate-infinity-scroll")

// console.log(checkboxActInfScr)
// console.log(loadMoreButton)


search.addEventListener("submit", onSubmitForm)
loadMoreButton.addEventListener("click", onLoadMorePhotos)

let activateInfinityScroll = false

const getFotoPixabay = new GetFotoPixabay()
const lightbox = new SimpleLightbox('.gallery a', { 
  captionsData: "alt",
  captionDelay: 500,
});

if (activateInfinityScroll) {
  loadMoreButton.classList.add("hide")
const options = {
  rootMargin: "200px",
  treshold: 1.0,
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("observe")
      onLoadMorePhotos()
    }
  })
}, options)

observer.observe(loadMoreButton)
}
  
async function onSubmitForm(event) {
  event.preventDefault()
  clear()
  activateInfinityScroll = checkboxActInfScr.checked
  const inputValue = event.target.elements.searchQuery.value

  getFotoPixabay.inputValue = inputValue
  
  try {
    const { hits, totalHits  } = await getFotoPixabay.fetchPhotos()
  if (totalHits === 0) {
    Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    event.target.reset()
    return
  }
    Notify.success(`Hooray! We found ${totalHits} images.`)
    renderMarkup(hits)
    lightbox.refresh()
    
    const totalPages = totalHits / getFotoPixabay.per_page
  if(totalPages > 1) {
    loadMoreButton.classList.remove("hide")
  }  
  } catch (error) { Notify.failure(error.message) }

  event.target.reset()
}

async function onLoadMorePhotos() {
  try {
    const { hits, totalHits } = await getFotoPixabay.fetchPhotos()
    renderMarkup(hits)
    lightbox.refresh()

    const totalPages = totalHits / getFotoPixabay.per_page
  if(getFotoPixabay.page > totalPages) {
      loadMoreButton.classList.add("hide")
      Notify.warning("We're sorry, but you've reached the end of search results.")
  }
    
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