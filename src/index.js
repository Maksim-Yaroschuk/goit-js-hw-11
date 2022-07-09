import { refs } from "./js/refs"
import {getFotoPixabay} from "./js/get-foto"
// import { GetFotoPixabay } from "./js/get-foto"
import { renderMarkup, clearMarkup } from "./js/markup"
import { observer, infinityScroll } from "./js/observer";
import { onLoadMorePhotos } from "./js/load-more";
import { lightbox } from "./js/initial-lightbox";
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"
import { Notify } from 'notiflix';

const { gallery, search, loadMoreButton, checkboxActInfScr } = refs


// const gallery = document.querySelector(".gallery")
// const search = document.querySelector(".search-form")
// const loadMoreButton = document.querySelector(".load-more")
// const checkboxActInfScr = document.getElementById("activate-infinity-scroll")

search.addEventListener("submit", onSubmitForm)
loadMoreButton.addEventListener("click", onLoadMorePhotos)

// const getFotoPixabay = new GetFotoPixabay()
// const lightbox = new SimpleLightbox('.gallery a', { 
//   captionsData: "alt",
//   captionDelay: 500,
// });

// const options = {
//   rootMargin: "200px",
//   treshold: 1.0,
// }
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       console.log("observe")
//       onLoadMorePhotos()
//     }
//   })
// }, options)
  
async function onSubmitForm(event) {
  event.preventDefault()
  clearMarkup()
  infinityScroll()

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

// async function onLoadMorePhotos() {
//   try {
//     const { hits, totalHits } = await getFotoPixabay.fetchPhotos()
//     renderMarkup(hits)
//     lightbox.refresh()

//     const totalPages = totalHits / getFotoPixabay.per_page
//   if(getFotoPixabay.page > totalPages) {
//       loadMoreButton.classList.add("hide")
//       Notify.warning("We're sorry, but you've reached the end of search results.")
//   }
//     smoothScrolling()

//     } catch (error) { Notify.failure(error.message) }
// }

// function infinityScroll() {
// const activateInfinityScroll = checkboxActInfScr.checked
//   if (activateInfinityScroll) {
//     loadMoreButton.classList.add("hide")
//     observer.observe(loadMoreButton)
//   }
// }

// function smoothScrolling() {
//     const { height: cardHeight } = document.querySelector(".gallery")
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: "smooth",
//     });
// }


// export { onLoadMorePhotos }

// function createdMarkup(images) {
//   return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
//            <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
//             </a>
//             </div>
//             </div>`).join("")
// }

// function renderMarkup(images) {
//   gallery.insertAdjacentHTML("beforeend", createdMarkup(images))
// }

// function clearMarkup() {
//   gallery.innerHTML = ""
//   loadMoreButton.classList.add("hide")
//   getFotoPixabay.resetPage()
// }