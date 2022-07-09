import { onLoadMorePhotos } from "./load-more";
import { refs } from "./refs"
const { loadMoreButton, checkboxActInfScr } = refs

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

function infinityScroll() {
const activateInfinityScroll = checkboxActInfScr.checked
  if (activateInfinityScroll) {
    loadMoreButton.classList.add("hide")
    observer.observe(loadMoreButton)
  }
}

export { observer, infinityScroll }