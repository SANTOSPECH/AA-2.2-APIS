import axios from 'axios';

const API_KEY = 'clave_invalida_123'; 
const ciudad = 'Madrid';

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`)
  .then(response => console.log('Clima:', response.data))
  .catch(error => console.error('Error:', error.response?.data || error.message));