import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchImg} from './fetchImg';
var debounce = require('debounce');

const refs = {
    form : document.querySelector('.search-form'),
    input : document.querySelector('input'),
    button : document.querySelector('button'),
    conteinerImg : document.querySelector('.gallery'),
    buttonPage : document.querySelector('.btn-page')
    
}






refs.form.addEventListener('submit', searchImg)
refs.buttonPage.addEventListener('click',addPage)







function searchImg(e){
    e.preventDefault()
    

    
    const inputValue = refs.input.value.trim();
    refs.conteinerImg.innerHTML = '';
    fetchImg(inputValue)
    .then((resp) => {
        
        const imgArr = resp.data.hits
        if(imgArr.length <= 0 || inputValue.length === 0){
            refs.conteinerImg.innerHTML = '';
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }else{
            refs.conteinerImg.insertAdjacentHTML('beforeend', markup(imgArr))
            
        }
        
        
    })
    .catch((error)=>{
        Notiflix.Notify.failure('error')
    })
}




function markup(arrImg){
    const markupImg = arrImg.map((img)=>{
        return `<div class="card">
        <div class="img-holder">
          <div class="overlay"><i class="fa fa-search"></i></div>
          <img src="${img.webformatURL}" alt="${img.tags}" width = "25px" />
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


// function markupBtn(){
//  return   `<button class="button12 btn-page">
//         <em> </em>   
//          <span>
//            Search Images
//            </span>
//           </button>
//           `
// }

function addPage(e){
    fetchImg(e)
    .then((resp) =>{
        console.log(resp)
    })
}