import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deli-burger.firebaseio.com/'
});

export default instance;
