
import Notiflix from 'notiflix';
export async  function fetchCountries(searchName) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${searchName}?fields=name,capital,population,flags,languages`
  ).then(response => {
      
    if(response.status !== 200){
      throw new Error('Oops, there is no country with that name')
    }
    return response;
  })
  .then(response => {
    return response.json();
  })
  
}