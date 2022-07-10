import { loadMoreButton } from "./refs"
import { renderMarkup } from "./markup"
import { smoothScrolling } from "./smooth-scroll"
import { Notify } from 'notiflix';
import { getFotoPixabay } from "./get-foto"
import { lightbox } from "./initial-lightbox";

// const { loadMoreButton } = refs

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