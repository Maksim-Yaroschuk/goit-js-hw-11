import {getFotoPixabay} from "./get-foto"
import { gallery, loadMoreButton } from "./refs"

const createdMarkup = (images) => {
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

const renderMarkup = (images) => {
  gallery.insertAdjacentHTML("beforeend", createdMarkup(images))
}

const clearMarkup = () => {
  gallery.innerHTML = ""
  loadMoreButton.classList.add("hide")
  getFotoPixabay.resetPage()
}

export {renderMarkup, clearMarkup}