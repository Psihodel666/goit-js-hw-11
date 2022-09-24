import './css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
import { searchQuery} from './fetchImg';
var debounce = require('debounce');
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
let lightbox = new SimpleLightbox('.img-conteiner a',{
  captions:true,
  captionDelay:250,});



const refs = {
    form : document.querySelector('.search-form'),
    input : document.querySelector('input'),
    button : document.querySelector('button'),
    conteinerImg : document.querySelector('.gallery'),
    buttonPage : document.querySelector('.js-load-more')
    
}


refs.form.addEventListener('submit', searchImg)
refs.buttonPage.addEventListener('click', onButtonClick)

async function searchImg(e){
    e.preventDefault()
    const query = e.target.elements.searchQuery.value.trim();
    const response = await searchQuery.searchPictures(query);
    
    const imgArr = response.hits;

    try {
      refs.conteinerImg.innerHTML = '';
        if(imgArr.length === 0){
             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            refs.buttonPage.classList.add('visually-hidden')
            return
        }else if(!query){
          Notiflix.Notify.info('Please, enter key word for search!');
          refs.buttonPage.classList.add('visually-hidden')
          return
        }
        else{
            refs.conteinerImg.insertAdjacentHTML('beforeend', markup(imgArr))
            refs.buttonPage.classList.remove('visually-hidden')
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
          });
                      return lightbox;
            
            
        }
        
        
    }
   
    catch(error){
        Notiflix.Notify.failure('error')
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
          <p class="category">Lifestyle</p>
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






async function onButtonClick() {
  searchQuery.page += 1;

  const response = await searchQuery.searchPictures();
  if (searchQuery.page > response.totalHits / searchQuery.per_page) {
      refs.buttonPage.classList.add('visually-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  refs.conteinerImg.insertAdjacentHTML('beforeend', markup(response.hits));
  return lightbox.refresh();

  
};








 