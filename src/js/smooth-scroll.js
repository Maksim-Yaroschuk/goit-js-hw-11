import { gallery } from "./refs"

function smoothScrolling() {
    const { height: cardHeight } = gallery
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
}

export { smoothScrolling }
