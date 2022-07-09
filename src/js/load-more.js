import { renderMarkup, clearMarkup } from "./markup"
import { smoothScrolling } from "./smooth-scroll"
import { Notify } from 'notiflix';
import { getFotoPixabay } from "./get-foto"
import { lightbox } from "./initial-lightbox";
// import { GetFotoPixabay } from "./get-foto"
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"

// const getFotoPixabay = new GetFotoPixabay()
const lightbox = new SimpleLightbox('.gallery a', { 
  captionsData: "alt",
  captionDelay: 500,
});

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
    smoothScrolling()

    } catch (error) { Notify.failure(error.message) }
}

export { onLoadMorePhotos }