import axios from 'axios';

const instance = axios.create({
  baseURL: `/api`,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));
