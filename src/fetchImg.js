export async  function fetchImg(searchName) {
  const axios = require('axios');
  const BASE_URL = 'https://pixabay.com/api/';
  const key = '30110883-082a3209dc2bc0d9dd6730db6';
  
  const option = {
    total : 1,
    totalHits : 10,
  }
  let page = 1; 
  return axios.get(
    `${BASE_URL}?key=${key}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch`
  ,option).then(response => {
      
    if(response.status !== 200){
      throw new Error('Oops, there is no country with that name')
    }
    return response;
  })

  
}