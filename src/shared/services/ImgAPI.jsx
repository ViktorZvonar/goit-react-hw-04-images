import axios from 'axios';

const KEY = '31880656-95c2fbbe9581639500b790cae';
const BASE_URL = 'https://pixabay.com/api';

const searchPicts = (search, page) => {
  return axios
    .get(
      `${BASE_URL}/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=15`
    )
    .then(response => response.data);
};

export default searchPicts;
