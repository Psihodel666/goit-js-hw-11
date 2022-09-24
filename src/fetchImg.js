// export async  function fetchImg(searchName) {
//   const axios = require('axios');
//   const BASE_URL = 'https://pixabay.com/api/';
//   const key = '30110883-082a3209dc2bc0d9dd6730db6';
  
//   let page = 1; 
//   return axios.get(
//     `${BASE_URL}?key=${key}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch&per_page=40&page=${page}`
//   ).then(response => {
//     if(response.status !== 200){
//       throw new Error('Oops, there is no country with that name')
//     }
//     return response;
//   })

  
// }
import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";

export class searchQuery {
   
   static page = 1;
   static image_type = "photo";
   static key = '29904861-3a00656c8c471d49ecd8a16bd';
   static query = '';
   static orientation ='horizontal';
   static safesearch = 'true';
   static per_page = 40;
   static maxPage = 13;

   static async searchPictures(query = '') {
    if(query.trim()) searchQuery.query = query;

    
   const config = {
        params: {
            key: searchQuery.key,
            q: searchQuery.query,
            image_type: searchQuery.image_type,
            orientation: searchQuery.orientation,
            safesearch: searchQuery.safesearch,
            per_page: searchQuery.per_page,
            page: searchQuery.page,
            maxPage: searchQuery.maxPage,
        }
       }

       const response = await axios.get(`${BASE_URL}`, config);
       return response.data;
   }

};