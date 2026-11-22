// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector('.gallery'),
    loader = document.querySelector('.loader'),
    addMore = document.querySelector('.add-more');
const galleryBox = new SimpleLightbox('.gallery a', 
        {
            captions: true,
            captionsData: "alt",
            captionPosition: 'bottom',
            captionDelay: 250
        }
    );
export const createGallery = (images) => {
    
    const markup = images.map(
    (img) => `
  <li class="gallery-item">
  <a class="gallery-link" href="${img.largeImageURL}">
    <img
      class="gallery-image"
      src="${img.webformatURL}"
      alt="${img.tags.split(',').slice(0, 3).join(', ')}"
    />
    <ul class="img-details">
        <li class="img-details-item">
            Likes
            <p>${img.likes}</p>
        </li>
        <li class="img-details-item">
            Views
            <p>${img.views}</p>
        </li>
        <li class="img-details-item">
            Comments
            <p>${img.comments}</p>
        </li>
        <li class="img-details-item">
            Downloads
            <p>${img.downloads}</p>
        </li>
    </ul>
    </a>
    </li>

`,
  )
        .join("");
    gallery.insertAdjacentHTML("beforeend", markup);
    galleryBox.refresh(); 
}
export const clearGallery = () => {
    gallery.innerHTML = "";
}

export const showLoader = () => {
    loader.classList.add('load');    
}

export const hideLoader = () => {
    loader.classList.remove('load');  
}

export const showLoadMoreButton = () => {
    addMore.classList.add('active');
}
export const hideLoadMoreButton = () => {
    addMore.classList.remove('active');
}