import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burgerapp-d11a6.firebaseio.com/'
});

export default instance;