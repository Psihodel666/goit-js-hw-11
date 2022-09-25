import './css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
import { searchQuery} from './fetchImg';
var debounce = require('debounce');
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.img-conteiner a',{
  captions:true,
  captionDelay:250,});

const refs = {
    form : document.querySelector('.search-form'),
    input : document.querySelector('input'),
    conteinerImg : document.querySelector('.gallery'),
    buttonPage : document.querySelector('.js-load-more')

}

refs.form.addEventListener('submit', searchImg)
refs.buttonPage.classList.add('visually-hidden')

async function searchImg(e){
    e.preventDefault();
    refs.conteinerImg.innerHTML = "";
    searchQuery.page = 1;

    const query = e.target.elements.searchQuery.value.trim();
    const response = await searchQuery.fetchSearch(query);
    const imgArr = response.hits;

    try {
        if(!query){
          return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
        }else if(imgArr.length === 0){
          return Notiflix.Notify.info('Please, enter key word for search!');
          // refs.buttonPage.classList.add('visually-hidden')
        }
        else{
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            refs.conteinerImg.insertAdjacentHTML('beforeend', markup(imgArr));
            if(searchQuery.page > response.totalHits / searchQuery.per_page){
              refs.buttonPage.classList.add('visually-hidden');
            }else{
              refs.buttonPage.classList.remove('visually-hidden');
            }
            return lightbox.refresh();
        }
    }
    catch(error){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
}

function markup(arrImg){
    const markupImg = arrImg.map((img)=>{
        return `<div class="card">
        <div class="img-holder">
          <div class="overlay"><i class="fa fa-search"></i></div>
          <div class ="img-conteiner">
          <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" width = "25px" class = 'gallery__image' />
          </a>
          </div>
        </div>
        <div class="content-holder">
          <p class="category">Info</p>
          <div class="separator">
            <span class="separator-sub"></span>
          </div>
          <ul class ="card-ul">
                   <li>
                     <span class="card-li">Likes</span>
                     <p>${img.likes}</p>
                   </li>
                   <li>
                     <span class="card-li">Views</span>
                     <p>${img.views}</p>
                   </li>
                   <li>
                     <span class="card-li">Comments</span>
                     <p>${img.comments}</p>
                   </li>
                    <li>
                    <span class="card-li">Downloads</span>
                    <p>${img.downloads}</p>
                    </li>
                   </ul>
        </div>
      </div>
      `
    }).join('');
    return markupImg
}

refs.buttonPage.addEventListener('click', onButtonClick)
async function onButtonClick() {
  searchQuery.page += 1;
  const response = await searchQuery.fetchSearch();
  if (searchQuery.page > response.totalHits / searchQuery.per_page) {
      refs.buttonPage.classList.add('visually-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  refs.conteinerImg.insertAdjacentHTML('beforeend', markup(response.hits));
  return lightbox.refresh();
};








 