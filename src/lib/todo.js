import axios from 'axios';

const BASE_URL = 'https://todo.api.devcode.gethired.id';

export const getAllActivity = async (id) => await axios
  .get(`${BASE_URL}/todo-items?activity_group_id=${id}`, {
  })
  .then((res) => res.data);