import { onLoadMorePhotos } from "./load-more";
import { loadMoreButton, checkboxActInfScr } from "./refs"
// const { loadMoreButton, checkboxActInfScr } = refs

const options = {
  rootMargin: "200px",
  treshold: 1.0,
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onLoadMorePhotos()
    }
  })
}, options)

function infinityScroll() {
  const activateInfinityScroll = checkboxActInfScr.checked
  observer.unobserve(loadMoreButton) 
  if (activateInfinityScroll) {
    loadMoreButton.classList.add("hide")
    observer.observe(loadMoreButton)
  }
}

export { observer, infinityScroll }