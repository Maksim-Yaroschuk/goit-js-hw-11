import { search, loadMoreButton } from "./js/refs"
import { getFotoPixabay } from "./js/get-foto"
import { renderMarkup, clearMarkup } from "./js/markup"
import { infinityScroll } from "./js/observer";
import { onLoadMorePhotos } from "./js/load-more";
import { lightbox } from "./js/initial-lightbox";
import { Notify } from 'notiflix';

// const { search, loadMoreButton } = refs

search.addEventListener("submit", onSubmitForm)
loadMoreButton.addEventListener("click", onLoadMorePhotos)
  
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