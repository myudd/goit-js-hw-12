// Тут пиши JavaScript свого домашнього завдання.
//У файлі main.js напиши всю логіку роботи застосунку. Виклики нотифікацій iziToast та всі перевірки на довжину масиву в отриманій відповіді роби саме в цьому файлі. Імпортуй у нього функції з файлів pixabay-api.js та render-functions.js і викликай їх у відповідний момент.
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery, perPage } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton
} from "./js/render-functions.js";

const form = document.querySelector(".form"),
    search = document.querySelector('input[name="search-text"]'),
    addMore = document.querySelector('.add-more');


const getError = {
  message:
    "Sorry, there are no images matching your search query. Please try again!",
  position: "topRight",
  messageColor: "white",
  backgroundColor: "red",
  color: "white",
  messageSize: "16",
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgoJPHBhdGggZD0iTTAgMGgxNnYxNkgweiIgZmlsbD0ibm9uZSIgLz4KCTxnIGZpbGw9IiNmZmYiPgoJCTxwYXRoIGQ9Ik00LjU0LjE0NkEuNS41IDAgMCAxIDQuODkzIDBoNi4yMTRhLjUuNSAwIDAgMSAuMzUzLjE0Nmw0LjM5NCA0LjM5NGEuNS41IDAgMCAxIC4xNDYuMzUzdjYuMjE0YS41LjUgMCAwIDEtLjE0Ni4zNTNsLTQuMzk0IDQuMzk0YS41LjUgMCAwIDEtLjM1My4xNDZINC44OTNhLjUuNSAwIDAgMS0uMzUzLS4xNDZMLjE0NiAxMS40NkEuNS41IDAgMCAxIDAgMTEuMTA3VjQuODkzYS41LjUgMCAwIDEgLjE0Ni0uMzUzek01LjEgMUwxIDUuMXY1LjhMNS4xIDE1aDUuOGw0LjEtNC4xVjUuMUwxMC45IDF6IiAvPgoJCTxwYXRoIGQ9Ik00LjY0NiA0LjY0NmEuNS41IDAgMCAxIC43MDggMEw4IDcuMjkzbDIuNjQ2LTIuNjQ3YS41LjUgMCAwIDEgLjcwOC43MDhMOC43MDcgOGwyLjY0NyAyLjY0NmEuNS41IDAgMCAxLS43MDguNzA4TDggOC43MDdsLTIuNjQ2IDIuNjQ3YS41LjUgMCAwIDEtLjcwOC0uNzA4TDcuMjkzIDhMNC42NDYgNS4zNTRhLjUuNSAwIDAgMSAwLS43MDgiIC8+Cgk8L2c+Cjwvc3ZnPgo=",
  class: "iziError",
};

hideLoader();

let req = "";
let page = 1;

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    req = data.get("search-text");
    if (search.value.trim() === "") {
        return;
    }
    clearGallery();
    hideLoadMoreButton();
    page = 1;
    await fetchAndRenderGallery();
});
addMore.addEventListener('click',  loadMore);
async function fetchAndRenderGallery() {

    hideLoadMoreButton();
    
    try {
        showLoader();
        const images = await getImagesByQuery(req, page);

        
        if (images.totalHits === 0) {
            iziToast.error(getError)
            hideLoadMoreButton();
            hideLoader();
            return;
        } 


        createGallery(images.hits);
        if (page * perPage >= images.totalHits) {
            hideLoader();
            iziToast.info(
                { position: "topRight", message: "We're sorry, but you've reached the end of search results." }
            );
        } else {
            hideLoader(); 
            showLoadMoreButton();
        }
                    
    } catch (error) { hideLoader(); iziToast.error(getError) }
}


async function loadMore() {
    try {
        page++;
        await fetchAndRenderGallery();
        scrollAfterClickLoadMore();
    }
    catch (error) {
        iziToast.error(getError);
    }
}
function scrollAfterClickLoadMore(){
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
// console.log('Шаблон готовий. Можна писати код 🚀');
